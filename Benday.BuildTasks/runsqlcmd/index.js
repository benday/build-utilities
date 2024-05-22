"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = require("path");
const tl = require("azure-pipelines-task-lib/task");
// import mod = require("./taskmod");
function isEmpty(str) {
    return (!str || 0 === str.length);
}
function run() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            let tool;
            const sqlcmdPath = tl.which("sqlcmd");
            if (isEmpty(sqlcmdPath)) {
                var errorMsg = "Could not locate sqlcmd.  Sqlcmd must be installed on this build agent and be part of the PATH.";
                tl.error(errorMsg);
                tl.setResult(tl.TaskResult.Failed, errorMsg);
            }
            else {
                tl.debug("Using sqlcmd located at " + sqlcmdPath);
            }
            const pathToEfDll = path.join(__dirname, "ef.dll");
            const sqlFilePath = tl.getInput("sqlFilePath", true);
            const serverName = tl.getInput("serverName", true);
            const sqlServerUserName = tl.getInput("sqlServerUserName", true);
            const sqlServerPassword = tl.getInput("sqlServerPassword", true);
            const sqlServerDatabase = tl.getInput("sqlServerDatabase", true);
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
            const returnCode = yield tool.exec();
            tl.debug("Completed call to sqlcmd with return code " + returnCode);
            if (returnCode === 0) {
                // this is fine
            }
            else {
                tl.error("Something went wrong with call to sqlcmd.");
                tl.setResult(tl.TaskResult.Failed, "Something went wrong with call to sqlcmd.");
            }
        }
        catch (error) {
            if (error instanceof Error) {
                const err = error;
                tl.setResult(tl.TaskResult.Failed, err.message);
            }
            else {
                tl.error('Someting went wrong.');
                tl.error(JSON.stringify(error));
                tl.error(JSON.stringify(error));
                tl.setResult(tl.TaskResult.Failed, JSON.stringify(error));
            }
        }
    });
}
run();
//# sourceMappingURL=index.js.map