set VersionToInclude=netcoreapp2.0
set FromPath=..\Benday.BuildUtilities.Core\published
set FileOrFilesToCopy=*.*

copy %FromPath%\%FileOrFilesToCopy% .\setappconfigappsetting
copy %FromPath%\%FileOrFilesToCopy% .\setappconfigconnectionstring
copy %FromPath%\%FileOrFilesToCopy% .\setjsonconfigconnectionstring
copy %FromPath%\%FileOrFilesToCopy% .\setjsonvalue