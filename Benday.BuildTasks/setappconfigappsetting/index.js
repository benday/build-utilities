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
                console.error("Path to dotnet is empty.  Do you have .NET Core 2.2 installed on this build agent?");
                tl.setResult(tl.TaskResult.Failed, "Path to dotnet is empty.  Do you have .NET Core 2.2 installed on this build agent?");
            }
            else {
                console.log("Using dotnet located at " + dotnetPath);
            }
            tool = tl.tool(dotnetPath).
                arg(path.join(__dirname, "BendayBuildConfigUtilCore.dll"))
                .arg("setappsetting")
                .arg("/filename:\"" + tl.getInput("filename", true) + "\"")
                .arg("/key:\"" + tl.getInput("keyname", true) + "\"")
                .arg("/value:\"" + tl.getInput("appsettingsvalue", true) + "\"")
                .arg("/version:true");
            const rc1 = yield tool.exec();
            console.log("Completed with return code " + rc1);
            if (rc1 === 0) {
                // this is fine
            }
            else {
                console.error("Something went wrong.  Do you have .NET Core installed on this build agent?");
                tl.setResult(tl.TaskResult.Failed, "Something went wrong.  Do you have .NET Core installed on this build agent?");
            }
        }
        catch (err) {
            console.error("Something went wrong.  Do you have .NET Core installed on this build agent?");
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
