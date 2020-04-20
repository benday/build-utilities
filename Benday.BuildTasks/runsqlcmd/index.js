"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const tl = require("vsts-task-lib/task");
// import mod = require("./taskmod");
function isEmpty(str) {
    return (!str || 0 === str.length);
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const sqlFilePath = tl.getInput("sqlFilePath");
            const serverName = tl.getInput("serverName");
            const sqlServerUserName = tl.getInput("sqlServerUserName");
            const sqlServerPassword = tl.getInput("sqlServerPassword");
            const sqlServerDatabase = tl.getInput("sqlServerDatabase");
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
        catch (err) {
            tl.error("Something unexpected and bad happened.");
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
