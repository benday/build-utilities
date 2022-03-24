import path = require("path");
import tl = require("azure-pipelines-task-lib/task");
import trm = require("azure-pipelines-task-lib/toolrunner");
// import mod = require("./taskmod");

function isEmpty(str: string): boolean {
    return (!str || 0 === str.length);
}

async function run(): Promise<void> {
    try {

        let tool: trm.ToolRunner;

        const sqlcmdPath: string = tl.which("sqlcmd");

        if (isEmpty(sqlcmdPath)) {
            var errorMsg = "Could not locate sqlcmd.  Sqlcmd must be installed on this build agent and be part of the PATH.";
            tl.error(errorMsg);
            tl.setResult(tl.TaskResult.Failed,
                errorMsg);
        } else {
            tl.debug("Using sqlcmd located at " + sqlcmdPath);
        }

        const pathToEfDll: string = path.join(__dirname, "ef.dll");

        const sqlFilePath: string = tl.getInput("sqlFilePath", true) as string;
        const serverName: string = tl.getInput("serverName", true) as string;
        const sqlServerUserName: string = tl.getInput("sqlServerUserName", true) as string;
        const sqlServerPassword: string = tl.getInput("sqlServerPassword", true) as string;
        const sqlServerDatabase: string = tl.getInput("sqlServerDatabase", true) as string;

        tool = tl.tool(sqlcmdPath)
            .arg("-S")
            .arg(serverName)
            .arg("-U")
            .arg(sqlServerUserName)
            .arg("-P")
            .arg(sqlServerPassword)
            .arg("-d")
            .arg(sqlServerDatabase)
            .arg("-i")
            .arg(sqlFilePath);

        const returnCode: number = await tool.exec();

        tl.debug("Completed call to sqlcmd with return code " + returnCode);

        if (returnCode === 0) {
            // this is fine
        } else {
            tl.error("Something went wrong with call to sqlcmd.");
            tl.setResult(tl.TaskResult.Failed,
                "Something went wrong with call to sqlcmd.");
        }
    } catch (error) {
        if (error instanceof Error) {
            const err: Error = error

            tl.setResult(tl.TaskResult.Failed, err.message);
        } else {
            tl.error('Someting went wrong.')
            tl.error(JSON.stringify(error))
            tl.error(JSON.stringify(error))
            tl.setResult(tl.TaskResult.Failed,
                JSON.stringify(error))
        }
    }
}

run();
