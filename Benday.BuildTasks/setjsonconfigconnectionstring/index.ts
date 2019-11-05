import tl = require("azure-pipelines-task-lib/task");
import path = require("path");
import { JsonEditor } from "./JsonEditor";

function isEmpty(str: string): boolean {
    return (!str || 0 === str.length);
}

async function run(): Promise<void> {
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
        } else {
            const editor: JsonEditor = new JsonEditor();

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
    } catch (err) {
        tl.error("Something went wrong.");
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
