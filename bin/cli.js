#!/usr/bin/env node

const { execSync } = require('child_process');

const runCommand = command => {
    try {
        execSync(`${command}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/elhe26/express-ts-jest-boilerplate ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);

if (!installedDeps) process.exit(-1);

console.log("Congratulations! Process Completed. Follow the steps in README.md to complete configuration.");
console.log(`Configure Husky (Check CONFIGURATION inside husky folder)`);
console.log(`Configure CI/CD (Check README)`);
console.log(``);
console.log("Follow the following commands to start dev environment");
console.log(`cd ${repoName} && npm dev`);
