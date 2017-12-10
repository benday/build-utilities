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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tool;
            let dotnetPath = tl.which('dotnet');
            tool = tl.tool(dotnetPath).
                arg(path.join(__dirname, 'BendayBuildConfigUtilCore.dll'))
                .arg('setappsetting')
                .arg('/filename:"' + tl.getInput('filename', true) + '"')
                .arg('/key:"' + tl.getInput('keyname', true) + '"')
                .arg('/value:"' + tl.getInput('appsettingsvalue', true) + '"')
                .arg('/version:true');
            let rc1 = yield tool.exec();
            console.log('Completed with return code ' + rc1);
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
