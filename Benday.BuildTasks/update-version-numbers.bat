set MajorVersionNumber=1

set PathToBendayBuildConfigUtilCoreDll=..\Benday.BuildUtilities.Core\src\Benday.BuildUtilities.Core.ConsoleUi\bin\Debug\netcoreapp1.1\BendayBuildConfigUtilCore.dll

set RunTheDllCommmandBase=dotnet %PathToBendayBuildConfigUtilCoreDll% setjsonvalue

set TheCommandPlusFilenameArg=%RunTheDllCommmandBase% /filename:.\vss-extension.json
%TheCommandPlusFilenameArg% /level1:version /value:%MajorVersionNumber%.%1.0

set TheCommandPlusFilenameArg=%RunTheDllCommmandBase% /filename:.\setappconfigappsetting\task.json

%TheCommandPlusFilenameArg% /level1:version /level2:Major /value:%MajorVersionNumber%
%TheCommandPlusFilenameArg% /level1:version /level2:Minor /value:%1

set TheCommandPlusFilenameArg=%RunTheDllCommmandBase% /filename:.\setappconfigconnectionstring\task.json

%TheCommandPlusFilenameArg% /level1:version /level2:Major /value:%MajorVersionNumber%
%TheCommandPlusFilenameArg% /level1:version /level2:Minor /value:%1

set TheCommandPlusFilenameArg=%RunTheDllCommmandBase% /filename:.\setjsonconfigconnectionstring\task.json

%TheCommandPlusFilenameArg% /level1:version /level2:Major /value:%MajorVersionNumber%
%TheCommandPlusFilenameArg% /level1:version /level2:Minor /value:%1

set TheCommandPlusFilenameArg=%RunTheDllCommmandBase% /filename:.\deployefcoremigrations\task.json

%TheCommandPlusFilenameArg% /level1:version /level2:Major /value:%MajorVersionNumber%
%TheCommandPlusFilenameArg% /level1:version /level2:Minor /value:%1

