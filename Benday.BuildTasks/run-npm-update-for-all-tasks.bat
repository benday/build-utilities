set "base=%cd%"

set "taskDirName=runsqlcmd"
echo starting %taskDirName%
cd %taskDirName%
call npm update
call npm audit fix
echo finished %taskDirName%
cd %base%

set "taskDirName=setappconfigconnectionstring"
echo starting %taskDirName%
cd %taskDirName%
call npm update
call npm audit fix
echo finished %taskDirName%
cd %base%

set "taskDirName=setappconfigappsetting"
echo starting %taskDirName%
cd %taskDirName%
call npm update
call npm audit fix
echo finished %taskDirName%
cd %base%

set "taskDirName=setjsonconfigconnectionstring"
echo starting %taskDirName%
cd %taskDirName%
call npm update
call npm audit fix
echo finished %taskDirName%
cd %base%

set "taskDirName=deployefcoremigrations"
echo starting %taskDirName%
cd %taskDirName%
call npm update
call npm audit fix
echo finished %taskDirName%
cd %base%

set "taskDirName=setjsonvalue"
echo starting %taskDirName%
cd %taskDirName%
call npm update
call npm audit fix
echo finished %taskDirName%
cd %base%