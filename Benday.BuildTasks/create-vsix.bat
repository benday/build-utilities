set "base=%cd%"

cd setappconfigconnectionstring

tsc

cd %base%

cd setappconfigappsetting

tsc

cd %base%

cd setjsonconfigconnectionstring

tsc

cd %base%

cd deployefcoremigrations

tsc

cd %base%

tfx extension create --manifest-globs vss-extension.json