import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');
import mod = require('./taskmod');
import path = require('path');
import os = require('os');

async function run() {
    try {
        
        let tool: trm.ToolRunner;
        
        let dotnetPath = tl.which('dotnet');

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
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();