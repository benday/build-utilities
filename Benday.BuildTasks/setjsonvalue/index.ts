import path = require("path");
import tl = require("vsts-task-lib/task");
import trm = require("vsts-task-lib/toolrunner");
import { JsonEditor } from "./JsonEditor";
import mod = require("./taskmod");

function isEmpty(str: string): boolean {
    return (!str || 0 === str.length);
}

async function run(): Promise<void> {
    try {
        const numberOfLevels: string = tl.getInput("numberOfLevels", true);
        const filename = tl.getInput("filename", true);
        const valueToSet = tl.getInput("valueToSet", true);
        const key1 = tl.getInput("keyname1", true);

        const editor: JsonEditor = new JsonEditor();

        editor.open(filename);

        if (numberOfLevels === "1") {
            editor.setValue(valueToSet, key1);
            editor.save(filename);
        } else if (numberOfLevels === "2") {
            const key2 = tl.getInput("keyname2", true);

            editor.setValue(valueToSet, key1, key2);
            editor.save(filename);
        } else if (numberOfLevels === "3") {
            const key2 = tl.getInput("keyname2", true);
            const key3 = tl.getInput("keyname3", true);

            editor.setValue(valueToSet, key1, key2, key3);
            editor.save(filename);
        }
    } catch (err) {
        console.error("Something went wrong.");
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
