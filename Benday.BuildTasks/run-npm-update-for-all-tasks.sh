#!/bin/bash

base="$PWD"

runCommands() {
    echo -----
    taskDirName="$1"
    pathToDir="$base/$taskDirName"

    echo "Working on $taskDirName"

    echo "changing dir to $pathToDir"
    cd $pathToDir
    npm update
    # npm audit fix --force
    npm audit fix
    echo "finished $taskDirName"
    echo -----
    cd $base
}

runCommands "runsqlcmd"
runCommands "setappconfigconnectionstring"
runCommands "setappconfigappsetting"
runCommands "setjsonconfigconnectionstring"
runCommands "deployefcoremigrations"
runCommands "setjsonvalue"
