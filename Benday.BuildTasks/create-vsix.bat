set "base=%cd%"

cd runsqlcmd

call tsc

echo finished compiling runsqlcmd

cd %base%

cd setappconfigconnectionstring

call tsc

echo finished compiling setappconfigconnectionstring

cd %base%

cd setappconfigappsetting

call tsc

cd %base%

cd setjsonconfigconnectionstring

call tsc

cd %base%

cd deployefcoremigrations

call tsc

cd %base%

cd setjsonvalue

call tsc

cd %base%

tfx extension create --manifest-globs vss-extension.json