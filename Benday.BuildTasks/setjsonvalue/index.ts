import tl = require("vsts-task-lib/task");
import trm = require("vsts-task-lib/toolrunner");
import mod = require("./taskmod");
import path = require("path");

function isEmpty(str : string): boolean {
    return (!str || 0 === str.length);
}

async function run(): Promise<void> {
    try {
        let tool: trm.ToolRunner;

        let dotnetPath : string = tl.which("dotnet");

        if (isEmpty(dotnetPath)) {
            console.error("Path to dotnet is empty.  Do you have .NET Core 2.2 installed on this build agent?");
            tl.setResult(tl.TaskResult.Failed, "Path to dotnet is empty.  Do you have .NET Core 2.2 installed on this build agent?");
        } else {
            console.log("Using dotnet located at " + dotnetPath);
        }

        let numberOfLevels : string = tl.getInput("numberOfLevels", true);

        let readyToRun : boolean = false;

        if (numberOfLevels === "1") {
            tool = tl.tool(dotnetPath)
                .arg(path.join(__dirname, "BendayBuildConfigUtilCore.dll"))
                .arg("setjsonvalue")
                .arg("/filename:\"" + tl.getInput("filename", true) + "\"")
                .arg("/level1:\"" + tl.getInput("keyname1", true) + "\"")
                .arg("/value:\"" + tl.getInput("valueToSet", true) + "\"")
                .arg("/version:true");

            readyToRun = true;
        } else if (numberOfLevels === "2")
        {
            tool = tl.tool(dotnetPath)
                .arg(path.join(__dirname, "BendayBuildConfigUtilCore.dll"))
                .arg("setjsonvalue")
                .arg("/filename:\"" + tl.getInput("filename", true) + "\"")
                .arg("/level1:\"" + tl.getInput("keyname1", true) + "\"")
                .arg("/level2:\"" + tl.getInput("keyname2", true) + "\"")
                .arg("/value:\"" + tl.getInput("valueToSet", true) + "\"")
                .arg("/version:true");

            readyToRun = true;
        } else if (numberOfLevels === "3") {
            tool = tl.tool(dotnetPath)
                .arg(path.join(__dirname, "BendayBuildConfigUtilCore.dll"))
                .arg("setjsonvalue")
                .arg("/filename:\"" + tl.getInput("filename", true) + "\"")
                .arg("/level1:\"" + tl.getInput("keyname1", true) + "\"")
                .arg("/level2:\"" + tl.getInput("keyname2", true) + "\"")
                .arg("/level3:\"" + tl.getInput("keyname3", true) + "\"")
                .arg("/value:\"" + tl.getInput("valueToSet", true) + "\"")
                .arg("/version:true");

            readyToRun = true;
        } else
        {
            let errorMessage : string = "Something went wrong.  Invalid number of levels argument value: " + numberOfLevels;

            console.error(errorMessage);
            tl.setResult(tl.TaskResult.Failed, errorMessage);
        }

        if (readyToRun === true) {
            let rc1: number = await tool.exec();

            console.log("Completed with return code " + rc1);

            if (rc1 === 0) {
                // this is fine
            } else {
                console.error("Something went wrong.  Do you have .NET Core installed on this build agent?");
                tl.setResult(tl.TaskResult.Failed, "Something went wrong.  Do you have .NET Core installed on this build agent?");
            }
        }
    } catch (err) {
        console.error("Something went wrong.  Do you have .NET Core installed on this build agent?");
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();