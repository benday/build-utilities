@echo off

if "%1"=="" (
    goto error
) else (
    goto runcommands
    goto exit
)   

:runcommands
set MajorVersionNumber=1

set PathToBendayBuildConfigUtilCoreDll=..\Benday.BuildUtilities.Core\src\Benday.BuildUtilities.Core.ConsoleUi\bin\Debug\netcoreapp1.1\BendayBuildConfigUtilCore.dll

set RunTheDllCommmandBase=dotnet %PathToBendayBuildConfigUtilCoreDll% setjsonvalue

echo updating version in vss-extension.json
set TheCommandPlusFilenameArg=%RunTheDllCommmandBase% /filename:.\vss-extension.json
%TheCommandPlusFilenameArg% /level1:version /value:%MajorVersionNumber%.%1.0

set TheCommandPlusFilenameArg=%RunTheDllCommmandBase% /filename:.\setappconfigappsetting\task.json

echo updating major version number in setappconfigsetting 
%TheCommandPlusFilenameArg% /level1:version /level2:Major /value:%MajorVersionNumber%
echo updating minor version number in setappconfigsetting
%TheCommandPlusFilenameArg% /level1:version /level2:Minor /value:%1

set TheCommandPlusFilenameArg=%RunTheDllCommmandBase% /filename:.\setappconfigconnectionstring\task.json

echo updating major version number in setappconfigconnectionstring
%TheCommandPlusFilenameArg% /level1:version /level2:Major /value:%MajorVersionNumber%
echo updating minor version number in setappconfigconnectionstring
%TheCommandPlusFilenameArg% /level1:version /level2:Minor /value:%1

set TheCommandPlusFilenameArg=%RunTheDllCommmandBase% /filename:.\setjsonconfigconnectionstring\task.json

echo updating major version number in setjsonconfigconnectionstring
%TheCommandPlusFilenameArg% /level1:version /level2:Major /value:%MajorVersionNumber%
echo updating minor version number in setjsonconfigconnectionstring
%TheCommandPlusFilenameArg% /level1:version /level2:Minor /value:%1

set TheCommandPlusFilenameArg=%RunTheDllCommmandBase% /filename:.\deployefcoremigrations\task.json

echo updating major version number in deployefcoremigrations
%TheCommandPlusFilenameArg% /level1:version /level2:Major /value:%MajorVersionNumber%
echo updating minor version number in deployefcoremigrations
%TheCommandPlusFilenameArg% /level1:version /level2:Minor /value:%1

set TheCommandPlusFilenameArg=%RunTheDllCommmandBase% /filename:.\setjsonvalue\task.json

echo updating major version number in setjsonvalue
%TheCommandPlusFilenameArg% /level1:version /level2:Major /value:%MajorVersionNumber%
echo updating minor version number in setjsonvalue
%TheCommandPlusFilenameArg% /level1:version /level2:Minor /value:%1

echo.
echo version numbers are updated

goto exit

:error
echo error: argument value for minor version number is required
echo %~n0%~x0 [version-number]

:exit
