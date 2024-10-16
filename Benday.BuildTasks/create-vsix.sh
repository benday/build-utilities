#!/bin/bash

base="$PWD"

cd runsqlcmd

echo $PWD


tsc

echo finished compiling runsqlcmd

cd $base

cd setappconfigconnectionstring
echo $PWD

tsc

echo finished compiling setappconfigconnectionstring

cd $base

cd setappconfigappsetting
echo $PWD

tsc

cd $base

cd setjsonconfigconnectionstring
echo $PWD

tsc

cd $base

cd deployefcoremigrations
echo $PWD

tsc

cd $base

cd setjsonvalue
echo $PWD

tsc

cd $base
echo $PWD

tfx extension create --manifest-globs vss-extension.json