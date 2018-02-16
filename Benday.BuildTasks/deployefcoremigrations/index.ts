import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');
import mod = require('./taskmod');
import path = require('path');
import os = require('os');

function isEmpty(str) {
    return (!str || 0 === str.length);
}

async function run() {
    try {
        
        let tool: trm.ToolRunner;
        
        let dotnetPath = tl.which('dotnet');

        if (isEmpty(dotnetPath)) {
            console.error('Path to dotnet is empty.  Do you have .NET Core 2 installed on this build agent?');
            tl.setResult(tl.TaskResult.Failed, 'Path to dotnet is empty.  Do you have .NET Core installed on this build agent?');
        }
        else {
            console.log('Using dotnet located at ' + dotnetPath);
        }

        let pathToEfDll = path.join(__dirname, 'ef.dll')
        
        let efMigrationsNamespace = tl.getInput('migrationsNamespace')
        let efMigrationsDllName = tl.getInput('migrationsDll')
        let efMigrationsDllDirectory = path.dirname(efMigrationsDllName)
        
        // change working directory
        tl.cd(efMigrationsDllDirectory)        
        
        let efMigrationsDllDepsJson = efMigrationsNamespace + '.deps.json'
        // let efMigrationDllDepsJsonPath = path.join(efMigrationsDllDirectory, efMigrationsDllDepsJson)
        let depsJsonFilePath = tl.getInput('depsJsonFile')
        let pathToNuGetPackages = path.join(os.homedir(), '.nuget/packages')

        tool = tl.tool(dotnetPath)
            .arg('exec')
            .arg('--depsfile')
            .arg(depsJsonFilePath)
            .arg('--additionalprobingpath')
            .arg(pathToNuGetPackages)
            .arg(pathToEfDll)
            .arg('database')
            .arg('update')
            .arg('--assembly')
            .arg(efMigrationsDllName)
            .arg('--startup-assembly')
            .arg(efMigrationsDllName)
            .arg('--project-dir')
            .arg(efMigrationsDllDirectory)
            .arg('--data-dir')
            .arg(efMigrationsDllDirectory)
            .arg('--verbose')
            .arg('--root-namespace')
            .arg(efMigrationsNamespace);

            
        let rc1: number = await tool.exec();
        
        console.log('Completed with return code ' + rc1);

        if (rc1 == 0) {
            // this is fine
        }
        else {
            console.error('Something went wrong.  Do you have .NET Core installed on this build agent?');
            tl.setResult(tl.TaskResult.Failed, 'Something went wrong.  Do you have .NET Core installed on this build agent?');
        }
    }
    catch (err) {
        console.error('Something went wrong.  Do you have .NET Core installed on this build agent?');
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();