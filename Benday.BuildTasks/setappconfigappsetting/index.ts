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
            console.error("Path to dotnet is empty.  Do you have .NET Core 2.2 installed on this build agent?");
            tl.setResult(tl.TaskResult.Failed, 
                "Path to dotnet is empty.  Do you have .NET Core 2.2 installed on this build agent?");
        } else {
            console.log("Using dotnet located at " + dotnetPath);
        }

        tool = tl.tool(dotnetPath).
            arg(path.join(__dirname, "BendayBuildConfigUtilCore.dll"))
            .arg("setappsetting")
            .arg("/filename:\"" + tl.getInput("filename", true) + "\"")
            .arg("/key:\"" + tl.getInput("keyname", true) + "\"")
            .arg("/value:\"" + tl.getInput("appsettingsvalue", true) + "\"")
            .arg("/version:true")
            ;

        const rc1: number = await tool.exec();

        console.log("Completed with return code " + rc1);

        if (rc1 === 0) {
            // this is fine
        } else {
            console.error("Something went wrong.  Do you have .NET Core installed on this build agent?");
            tl.setResult(tl.TaskResult.Failed, 
                "Something went wrong.  Do you have .NET Core installed on this build agent?");
        }
    } catch (err) {
        console.error("Something went wrong.  Do you have .NET Core installed on this build agent?");
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
