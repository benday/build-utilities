import path = require("path");
import tl = require("azure-pipelines-task-lib/task");
import { JsonEditor } from "./JsonEditor";

function isEmpty(str: string): boolean {
    return (!str || 0 === str.length);
}

async function run(): Promise<void> {
    try {
        const numberOfLevels: string = tl.getInput("numberOfLevels", true);
        const filename = tl.getInput("filename", true);
        let valueToSet = tl.getInput("valueToSet", false);
        const key1 = tl.getInput("keyname1", true);

        if (valueToSet === undefined || valueToSet === null) {
            valueToSet = '';
        }

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
        } else if (numberOfLevels === "4") {
            const key2 = tl.getInput("keyname2", true);
            const key3 = tl.getInput("keyname3", true);
            const key4 = tl.getInput("keyname4", true);

            editor.setValue(valueToSet, key1, key2, key3, key4);
            editor.save(filename);
        }
    } catch (err) {
        tl.error("Something went wrong.");
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
