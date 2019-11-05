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
const tl = require("azure-pipelines-task-lib/task");
const JsonEditor_1 = require("./JsonEditor");
function isEmpty(str) {
    return (!str || 0 === str.length);
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            tl.debug("setjsonconfigconnectionstring starting....");
            const filename = tl.getInput("filename", true);
            const valueToSet = tl.getInput("connectionstringvalue", true);
            const key = tl.getInput("keyname", true);
            tl.debug("filename: " + filename);
            tl.debug("connection string value: " + valueToSet);
            tl.debug("connection string name: " + key);
            const fileExists = tl.exist(filename);
            if (!fileExists) {
                tl.error("Configuration file does not exist.");
                tl.error("Expected configuration filename: " + filename);
                tl.setResult(tl.TaskResult.Failed, "Configuration file does not exist.");
            }
            else {
                const editor = new JsonEditor_1.JsonEditor();
                tl.debug("Configuration file exists.");
                tl.debug("opening file...");
                editor.open(filename);
                tl.debug("opened file");
                tl.debug(editor.Contents);
                tl.debug("setting connection string...");
                editor.setConnectionString(key, valueToSet);
                tl.debug("saving changes...");
                editor.save(filename);
                tl.debug("saved changes.");
            }
        }
        catch (err) {
            tl.error("Something went wrong.");
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
