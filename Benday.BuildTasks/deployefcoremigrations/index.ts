import tl = require("vsts-task-lib/task");
import trm = require("vsts-task-lib/toolrunner");
import mod = require("./taskmod");
import path = require("path");
import * as os from "os";

function isEmpty(str : string): boolean {
    return (!str || 0 === str.length);
}

async function run(): Promise<void> {
    try {

        let tool: trm.ToolRunner;

        let dotnetPath : string = tl.which("dotnet");

        if (isEmpty(dotnetPath)) {
            console.error("Path to dotnet is empty.  Do you have .NET Core 2 installed on this build agent?");
            tl.setResult(tl.TaskResult.Failed, "Path to dotnet is empty.  Do you have .NET Core installed on this build agent?");
        } else {
            console.log("Using dotnet located at " + dotnetPath);
        }

        let pathToEfDll : string = path.join(__dirname, "ef.dll");

        let efMigrationsNamespace : string = tl.getInput("migrationsNamespace");
        let efMigrationsDllName : string = tl.getInput("migrationsDll");
        let efMigrationsDllDirectory : string = path.dirname(efMigrationsDllName);

        // change working directory
        tl.cd(efMigrationsDllDirectory);

        let efMigrationsDllDepsJson : string = efMigrationsNamespace + ".deps.json";
        // let efMigrationDllDepsJsonPath = path.join(efMigrationsDllDirectory, efMigrationsDllDepsJson)
        let depsJsonFilePath : string = tl.getInput("depsJsonFile");
        let pathToNuGetPackages : string = path.join(os.homedir(), ".nuget/packages");

        tool = tl.tool(dotnetPath)
            .arg("exec")
            .arg("--depsfile")
            .arg(depsJsonFilePath)
            .arg("--additionalprobingpath")
            .arg(pathToNuGetPackages)
            .arg(pathToEfDll)
            .arg("database")
            .arg("update")
            .arg("--assembly")
            .arg(efMigrationsDllName)
            .arg("--startup-assembly")
            .arg(efMigrationsDllName)
            .arg("--project-dir")
            .arg(efMigrationsDllDirectory)
            .arg("--data-dir")
            .arg(efMigrationsDllDirectory)
            .arg("--verbose")
            .arg("--root-namespace")
            .arg(efMigrationsNamespace);


        let rc1: number = await tool.exec();

        console.log("Completed with return code " + rc1);

        if (rc1 === 0) {
            // this is fine
        } else {
            console.error("Something went wrong.  Do you have .NET Core installed on this build agent?");
            tl.setResult(tl.TaskResult.Failed, "Something went wrong.  Do you have .NET Core installed on this build agent?");
        }
    } catch (err) {
        console.error("Something went wrong.  Do you have .NET Core installed on this build agent?");
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();