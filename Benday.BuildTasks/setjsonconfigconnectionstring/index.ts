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
        const filename = tl.getInput("filename", true);
        const valueToSet = tl.getInput("connectionstringvalue", true);
        const key = tl.getInput("keyname", true);

        const editor: JsonEditor = new JsonEditor();

        editor.open(filename);

        editor.setConnectionString(key, valueToSet);

        editor.save(filename);
    } catch (err) {
        console.error("Something went wrong.");
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
