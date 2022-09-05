import { exec } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const __dirname = dirname(new URL(import.meta.url).pathname);

console.log(exec);

function execShellCommand(cmd) {
  return new Promise((res) => {
    exec(cmd, (_, stdout, stderr) => {
      res(stdout ? stdout : stderr);
    });
  });
}

function clearAndUpper(text) {
  return text.replace(/-/, '').toUpperCase();
}

function toCamelCase(text) {
  return text.replace(/-\w/g, clearAndUpper);
}

function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

const folder = join(__dirname, 'heroicons');
const iconsFolder = __dirname; // Beware that this could break if the file is moved

const gitRepo = 'git clone https://github.com/tailwindlabs/heroicons.git';

const imports = [];

const iconTypes = {
  outline: ['24', 'outline'],
  solid: ['24', 'solid'],
  'tiny-solid': ['20', 'solid']
};

const processRepo = async () => {
  try {
    const folderPromises = Object.entries(iconTypes).map(async ([svgType, iconPath]) => {
      const srcFolder = join(folder, 'optimized', ...iconPath);
      const outFolder = join(iconsFolder, svgType);
      await execShellCommand(`rm -rf ${outFolder}`);

      if (!existsSync(outFolder)) {
        await mkdir(outFolder);
      }
      const iconFiles = await readdir(srcFolder);
      const iconPromises = iconFiles.map(async (svg) => {
        const src = join(srcFolder, svg);

        const everythingButExtension = svg.slice(0, svg.lastIndexOf('.'));
        const outName = everythingButExtension + '-' + svgType;
        const outFileName = `${outName}.tsx`;
        const out = join(outFolder, outFileName);
        const pascalName = toPascalCase(outName);
        const original = (await readFile(src)).toString();

        // React has different names for these (ie. they are camel cased)
        const processed = original
          .replace(/(clip-rule|fill-rule|stroke-linecap|stroke-linejoin|stroke-width)/g, (match) => {
            return toCamelCase(match);
          })
          .replace(/ fill="#fff"/, '')
          .replace(/ stroke="#[a-zA-Z0-9]+"/, ' stroke="currentColor"')
          .trim()
          .split('\n')
          .join('\n    ');

        imports.push([join(svgType, outFileName), pascalName]);

        const component = `<svg {...props} ref={ref} ${processed.slice(4)}`;

        await writeFile(
          out,
          `
import { h } from "preact";
import { forwardRef } from "preact/compat";
import { HeroIcon } from "../types";

export const ${pascalName}: HeroIcon = forwardRef((props, ref) => {
  return (
    ${component}
  )
})
          `.trim() + '\n'
        );
      });

      await Promise.all(iconPromises);
    });

    await Promise.all(folderPromises);
    console.log(`Built ${imports.length} icons!`);
    await writeFile(
      'index.ts',
      imports
        .sort(([_, a], [__, b]) => a.localeCompare(b))
        .map(([importPath, name]) => `export { ${name} } from "./${importPath.split('.')[0]}";`)
        .join('\n') +
        '\n' +
        `export type { HeroIcon } from "./types";`
    );
  } catch (e) {
    console.error(e);
  }
};

(async () => {
  console.time('Generating Icon Components');
  console.log(`Cloning ${gitRepo} to ${folder}`);
  await execShellCommand(`${gitRepo} ${folder}`);
  await processRepo();
  console.log('Removing the repo...');
  await execShellCommand(`rm -rf ${folder}`);
  console.timeEnd('Generating Icon Components');
})();
