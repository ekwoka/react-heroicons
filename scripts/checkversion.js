import { exec } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { exit } from 'node:process';

function execShellCommand(cmd) {
  return new Promise((res) => {
    exec(cmd, (error, stdout, stderr) => {
      res(stdout ? stdout : stderr);
    });
  });
}

const version = (
  await execShellCommand('npm info @heroicons/react version')
).trim();
const ourPackage = await readFile('package.json', 'utf8').then((data) =>
  JSON.parse(data)
);
const ourVersion = ourPackage.version;

const isOutdated =
  (/-/.test(ourVersion) &&
    version === ourVersion.split('.').slice(0, 3).join('.')) ||
  version > ourVersion.split('.').slice(0, 3).join('.');

console.log('React Heroicons:', version);
console.log('Preact Heroicons', ourVersion);
console.log(isOutdated ? 'Package is OUTDATED' : 'Package is UP TO DATE');

if (!isOutdated) exit(0);
else exit(1);
