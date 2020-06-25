set VersionToInclude=netcoreapp3.1
set FromPath=..\Benday.BuildUtilities.Core\published
set FileOrFilesToCopy=*.*

xcopy /e /y %FromPath%\ .\setappconfigappsetting
xcopy /e /y %FromPath%\ .\setappconfigconnectionstring