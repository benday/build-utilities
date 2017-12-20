"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("vsts-task-lib/task");
const path = require("path");
const os = require("os");
function isEmpty(str) {
    return (!str || 0 === str.length);
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tool;
            let dotnetPath = tl.which('dotnet');
            if (isEmpty(dotnetPath)) {
                console.error('Path to dotnet is empty.  Do you have .NET Core installed on this build agent?');
                tl.setResult(tl.TaskResult.Failed, 'Path to dotnet is empty.  Do you have .NET Core installed on this build agent?');
            }
            else {
                console.log('Using dotnet located at ' + dotnetPath);
            }
            let pathToEfDll = path.join(__dirname, 'ef.dll');
            let efMigrationsNamespace = tl.getInput('migrationsNamespace');
            let efMigrationsDllName = tl.getInput('migrationsDll');
            let efMigrationsDllDirectory = path.dirname(efMigrationsDllName);
            // change working directory
            tl.cd(efMigrationsDllDirectory);
            let efMigrationsDllDepsJson = efMigrationsNamespace + '.deps.json';
            // let efMigrationDllDepsJsonPath = path.join(efMigrationsDllDirectory, efMigrationsDllDepsJson)
            let depsJsonFilePath = tl.getInput('depsJsonFile');
            let pathToNuGetPackages = path.join(os.homedir(), '.nuget/packages');
            tool = tl.tool(dotnetPath)
                .arg('exec')
                .arg('--depsfile')
                .arg(depsJsonFilePath)
                .arg('--additionalprobingpath')
                .arg(pathToNuGetPackages)
                .arg(pathToEfDll)
                .arg('database')
                .arg('update')
                .arg('--assembly')
                .arg(efMigrationsDllName)
                .arg('--startup-assembly')
                .arg(efMigrationsDllName)
                .arg('--project-dir')
                .arg(efMigrationsDllDirectory)
                .arg('--data-dir')
                .arg(efMigrationsDllDirectory)
                .arg('--verbose')
                .arg('--root-namespace')
                .arg(efMigrationsNamespace);
            let rc1 = yield tool.exec();
            console.log('Completed with return code ' + rc1);
            if (rc1 == 0) {
                // this is fine
            }
            else {
                console.error('Something went wrong.  Do you have .NET Core installed on this build agent?');
                tl.setResult(tl.TaskResult.Failed, 'Something went wrong.  Do you have .NET Core installed on this build agent?');
            }
        }
        catch (err) {
            console.error('Something went wrong.  Do you have .NET Core installed on this build agent?');
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
