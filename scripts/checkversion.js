import { exec } from "child_process";
import { readFile, writeFile } from "fs/promises";
import { exit } from "process";

function execShellCommand(cmd) {
  return new Promise((res) => {
    exec(cmd, (error, stdout, stderr) => {
      res(stdout ? stdout : stderr);
    });
  });
}

const version = (
  await execShellCommand("npm info @heroicons/react version")
).trim();
const ourPackage = await readFile("package.json", "utf8").then((data) =>
  JSON.parse(data)
);
const ourVersion = ourPackage.version;

const isOutdated =
  ourVersion.split(".").length > 3 ||
  /-/.test(ourVersion) ||
  version > ourVersion.split(".").slice(0, 3).join(".");

console.log("React Heroicons:", version);
console.log("Preact Heroicons", ourVersion);
console.log(isOutdated ? "Package is OUTDATED" : "Package is UP TO DATE");

if (!isOutdated) exit(0);

ourPackage.version = version;

await writeFile("package.json", JSON.stringify(ourPackage, null, 2));
