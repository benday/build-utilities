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
const os = require("os");
const path = require("path");
const tl = require("vsts-task-lib/task");
function isEmpty(str) {
    return (!str || 0 === str.length);
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tool;
            const dotnetPath = tl.which("dotnet");
            if (isEmpty(dotnetPath)) {
                tl.error("Path to dotnet is empty.  Do you have .NET Core 2.2 installed on this build agent?");
                tl.setResult(tl.TaskResult.Failed, "Path to dotnet is empty.  Do you have .NET Core 2.2 installed on this build agent?");
            }
            else {
                tl.debug("Using dotnet located at " + dotnetPath);
            }
            const pathToEfDll = path.join(__dirname, "ef.dll");
            const efMigrationsNamespace = tl.getInput("migrationsNamespace");
            const efMigrationsDllName = tl.getInput("migrationsDll");
            const efMigrationsDllDirectory = path.dirname(efMigrationsDllName);
            // change working directory
            tl.cd(efMigrationsDllDirectory);
            const startupDllName = tl.getInput("startupDll");
            const dbContextClassName = tl.getInput("dbContextClassName");
            const efMigrationsDllDepsJson = efMigrationsNamespace + ".deps.json";
            // let efMigrationDllDepsJsonPath = path.join(efMigrationsDllDirectory, efMigrationsDllDepsJson)
            const depsJsonFilePath = tl.getInput("depsJsonFile");
            const runtimeConfigFilePath = tl.getInput("runtimeConfigFile");
            const pathToNuGetPackages = path.join(os.homedir(), ".nuget/packages");
            const deployMigrationByName = tl.getBoolInput("deployMigrationByName", false);
            if (deployMigrationByName === false) {
                tl.debug("Deploying all available migrations.");
                tool = tl.tool(dotnetPath)
                    .arg("exec")
                    .arg("--depsfile")
                    .arg(depsJsonFilePath)
                    .arg("--additionalprobingpath")
                    .arg(pathToNuGetPackages)
                    .arg("--runtimeconfig")
                    .arg(runtimeConfigFilePath)
                    .arg(pathToEfDll)
                    .arg("database")
                    .arg("update")
                    .arg("--assembly")
                    .arg(efMigrationsDllName)
                    .arg("--startup-assembly")
                    .arg(startupDllName)
                    .arg("--project-dir")
                    .arg(efMigrationsDllDirectory)
                    .arg("--data-dir")
                    .arg(efMigrationsDllDirectory)
                    .arg("--context")
                    .arg(dbContextClassName)
                    .arg("--verbose")
                    .arg("--root-namespace")
                    .arg(efMigrationsNamespace);
            }
            else {
                tl.debug("Deploying specific migration.");
                const migrationName = tl.getInput("migrationName", true);
                tl.debug("Migration name: " + migrationName);
                tool = tl.tool(dotnetPath)
                    .arg("exec")
                    .arg("--depsfile")
                    .arg(depsJsonFilePath)
                    .arg("--additionalprobingpath")
                    .arg(pathToNuGetPackages)
                    .arg("--runtimeconfig")
                    .arg(runtimeConfigFilePath)
                    .arg(pathToEfDll)
                    .arg("database")
                    .arg("update")
                    .arg(migrationName)
                    .arg("--assembly")
                    .arg(efMigrationsDllName)
                    .arg("--startup-assembly")
                    .arg(startupDllName)
                    .arg("--project-dir")
                    .arg(efMigrationsDllDirectory)
                    .arg("--data-dir")
                    .arg(efMigrationsDllDirectory)
                    .arg("--context")
                    .arg(dbContextClassName)
                    .arg("--verbose")
                    .arg("--root-namespace")
                    .arg(efMigrationsNamespace);
            }
            const rc1 = yield tool.exec();
            tl.debug("Completed call to tool with return code " + rc1);
            if (rc1 === 0) {
                // this is fine
            }
            else {
                tl.error("Something went wrong.  Do you have .NET Core installed on this build agent?");
                tl.setResult(tl.TaskResult.Failed, "Something went wrong.  Do you have .NET Core installed on this build agent?");
            }
        }
        catch (err) {
            tl.error("Something unexpected and bad happened.  Do you have .NET Core installed on this build agent?");
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
