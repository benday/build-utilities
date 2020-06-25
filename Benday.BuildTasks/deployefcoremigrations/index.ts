import * as os from "os";
import path = require("path");
import tl = require("azure-pipelines-task-lib/task");
import trm = require("azure-pipelines-task-lib/toolrunner");
import mod = require("./taskmod");

function isEmpty(str: string): boolean {
    return (!str || 0 === str.length);
}

async function run(): Promise<void> {
    try {

        let tool: trm.ToolRunner;

        const dotnetPath: string = tl.which("dotnet");

        if (isEmpty(dotnetPath)) {
            tl.error("Path to dotnet is empty.  Do you have .NET Core 2.2 installed on this build agent?");
            tl.setResult(tl.TaskResult.Failed,
                "Path to dotnet is empty.  Do you have .NET Core 2.2 installed on this build agent?");
        } else {
            tl.debug("Using dotnet located at " + dotnetPath);
        }

        const pathToEfDll: string = path.join(__dirname, "ef.dll");

        const efMigrationsNamespace: string = tl.getInput("migrationsNamespace");
        const efMigrationsDllName: string = tl.getInput("migrationsDll");
        const efMigrationsDllDirectory: string = path.dirname(efMigrationsDllName);

        // change working directory
        tl.cd(efMigrationsDllDirectory);

        const startupDllName: string = tl.getInput("startupDll");
        const dbContextClassName: string = tl.getInput("dbContextClassName");

        const efMigrationsDllDepsJson: string = efMigrationsNamespace + ".deps.json";
        // let efMigrationDllDepsJsonPath = path.join(efMigrationsDllDirectory, efMigrationsDllDepsJson)
        const depsJsonFilePath: string = tl.getInput("depsJsonFile");
        const runtimeConfigFilePath: string = tl.getInput("runtimeConfigFile");

        const pathToNuGetPackages: string = path.join(os.homedir(), ".nuget/packages");

        const deployMigrationByName: boolean = tl.getBoolInput("deployMigrationByName", false);

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
        } else {
            tl.debug("Deploying specific migration.");

            const migrationName: string = tl.getInput("migrationName", true);

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

        const rc1: number = await tool.exec();

        tl.debug("Completed call to tool with return code " + rc1);

        if (rc1 === 0) {
            // this is fine
        } else {
            tl.error("Something went wrong.  Do you have .NET Core installed on this build agent?");
            tl.setResult(tl.TaskResult.Failed,
                "Something went wrong.  Do you have .NET Core installed on this build agent?");
        }
    } catch (err) {
        tl.error("Something unexpected and bad happened.  Do you have .NET Core installed on this build agent?");
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
