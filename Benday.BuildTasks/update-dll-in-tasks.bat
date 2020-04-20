set VersionToInclude=netcoreapp3.1
set FromPath=..\Benday.BuildUtilities.Core\published
set FileOrFilesToCopy=*.*

copy %FromPath%\%FileOrFilesToCopy% .\setappconfigappsetting
copy %FromPath%\%FileOrFilesToCopy% .\setappconfigconnectionstring
rem copy %FromPath%\%FileOrFilesToCopy% .\setjsonconfigconnectionstring
rem copy %FromPath%\%FileOrFilesToCopy% .\setjsonvalue