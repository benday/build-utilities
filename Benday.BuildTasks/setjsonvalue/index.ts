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

            if (setValueAsArray === "true") {
                var values: string[] = [];

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
            } else {
                editor.setValue(valueToSet, key1, key2, key3, key4);
                editor.save(filename);
            }
        }
    } catch (err) {
        tl.error("Something went wrong.");
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
