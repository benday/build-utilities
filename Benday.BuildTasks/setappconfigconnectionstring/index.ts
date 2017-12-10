import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');
import mod = require('./taskmod');
import path = require('path');

async function run() {
    try {

        let tool: trm.ToolRunner;

        let dotnetPath = tl.which('dotnet');

        tool = tl.tool(dotnetPath).
            arg(path.join(__dirname, 'BendayBuildConfigUtilCore.dll'))
            .arg('setconnectionstring')
            .arg('/filename:"' + tl.getInput('filename', true) + '"')
            .arg('/name:"' + tl.getInput('keyname', true) + '"')
            .arg('/value:"' + tl.getInput('connectionstringvalue', true) + '"')
            .arg('/version:true')
            ;

        let rc1: number = await tool.exec();
                
        console.log('Completed with return code ' + rc1);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();