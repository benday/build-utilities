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
            const numberOfLevels = tl.getInput("numberOfLevels", true);
            const filename = tl.getInput("filename", true);
            let valueToSet = tl.getInput("valueToSet", false);
            const key1 = tl.getInput("keyname1", true);
            if (valueToSet === undefined || valueToSet === null) {
                valueToSet = '';
            }
            const editor = new JsonEditor_1.JsonEditor();
            editor.open(filename);
            if (numberOfLevels === "1") {
                editor.setValue(valueToSet, key1);
                editor.save(filename);
            }
            else if (numberOfLevels === "2") {
                const key2 = tl.getInput("keyname2", true);
                editor.setValue(valueToSet, key1, key2);
                editor.save(filename);
            }
            else if (numberOfLevels === "3") {
                const key2 = tl.getInput("keyname2", true);
                const key3 = tl.getInput("keyname3", true);
                editor.setValue(valueToSet, key1, key2, key3);
                editor.save(filename);
            }
        }
        catch (err) {
            tl.error("Something went wrong.");
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
