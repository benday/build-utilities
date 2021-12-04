#!/bin/bash

base="$PWD"

taskDirName="runsqlcmd"
echo starting cd $taskDirName
cd $taskDirName
npm install --production
npm prune --production
npm audit fix
echo finished cd $taskDirName
cd $base

taskDirName="setappconfigconnectionstring"
echo starting cd $taskDirName
cd $taskDirName
npm install --production
npm prune --production
npm audit fix
echo finished cd $taskDirName
cd $base

taskDirName="setappconfigappsetting"
echo starting cd $taskDirName
cd $taskDirName
npm install --production
npm prune --production
npm audit fix
echo finished cd $taskDirName
cd $base

taskDirName="setjsonconfigconnectionstring"
echo starting cd $taskDirName
cd $taskDirName
npm install --production
npm prune --production
npm audit fix
echo finished cd $taskDirName
cd $base

taskDirName="deployefcoremigrations"
echo starting cd $taskDirName
cd $taskDirName
npm install --production
npm prune --production
npm audit fix
echo finished cd $taskDirName
cd $base

taskDirName="setjsonvalue"
echo starting cd $taskDirName
cd $taskDirName
npm install --production
npm prune --production
npm audit fix
echo finished cd $taskDirName
cd $base

