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
            let setValueAsArray = tl.getInput("setValueAsArray", false);
            let valueToSet = tl.getInput("valueToSet", false);
            let valueToSet2 = tl.getInput("valueToSet2", false);
            let valueToSet3 = tl.getInput("valueToSet3", false);
            let valueToSet4 = tl.getInput("valueToSet4", false);
            let valueToSet5 = tl.getInput("valueToSet5", false);
            let valueToSet6 = tl.getInput("valueToSet6", false);
            let valueToSet7 = tl.getInput("valueToSet7", false);
            let valueToSet8 = tl.getInput("valueToSet8", false);
            let valueToSet9 = tl.getInput("valueToSet9", false);
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
            else if (numberOfLevels === "4") {
                const key2 = tl.getInput("keyname2", true);
                const key3 = tl.getInput("keyname3", true);
                const key4 = tl.getInput("keyname4", true);
                if (setValueAsArray === "true") {
                    var values = [];
                    if (!isEmpty(valueToSet)) {
                        values.push(valueToSet);
                    }
                    if (!isEmpty(valueToSet2)) {
                        values.push(valueToSet2);
                    }
                    if (!isEmpty(valueToSet3)) {
                        values.push(valueToSet3);
                    }
                    if (!isEmpty(valueToSet4)) {
                        values.push(valueToSet4);
                    }
                    if (!isEmpty(valueToSet5)) {
                        values.push(valueToSet5);
                    }
                    if (!isEmpty(valueToSet6)) {
                        values.push(valueToSet6);
                    }
                    if (!isEmpty(valueToSet7)) {
                        values.push(valueToSet7);
                    }
                    if (!isEmpty(valueToSet8)) {
                        values.push(valueToSet8);
                    }
                    if (!isEmpty(valueToSet9)) {
                        values.push(valueToSet9);
                    }
                    editor.setValueAsArray(values, key1, key2, key3, key4);
                    editor.save(filename);
                }
                else {
                    editor.setValue(valueToSet, key1, key2, key3, key4);
                    editor.save(filename);
                }
            }
        }
        catch (err) {
            tl.error("Something went wrong.");
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
