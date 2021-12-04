#!/bin/bash

base="$PWD"

cd runsqlcmd

tsc

echo finished compiling runsqlcmd

cd $base

cd setappconfigconnectionstring

tsc

echo finished compiling setappconfigconnectionstring

cd $base

cd setappconfigappsetting

tsc

cd $base

cd setjsonconfigconnectionstring

tsc

cd $base

cd deployefcoremigrations

tsc

cd $base

cd setjsonvalue

tsc

cd $base

tfx extension create --manifest-globs vss-extension.json