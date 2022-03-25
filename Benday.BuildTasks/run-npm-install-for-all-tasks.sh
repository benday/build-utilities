#!/bin/bash

base="$PWD"

runCommands() {
    echo -----
    taskDirName="$1"
    pathToDir="$base/$taskDirName"
    echo starting work on $taskDirName
    echo changing dir to $pathToDir
    cd $pathToDir
    npm install --production
    npm prune --production
    npm audit fix
    echo finished $taskDirName
    echo -----
    cd $base
}

runCommands "runsqlcmd"
runCommands "setappconfigconnectionstring"
runCommands "setappconfigappsetting"
runCommands "setjsonconfigconnectionstring"
runCommands "deployefcoremigrations"
runCommands "setjsonvalue"
