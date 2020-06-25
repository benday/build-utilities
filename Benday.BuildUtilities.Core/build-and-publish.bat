SET PublishToDir=.\published\
SET ProjectToBuildAndPublish=.\src\Benday.BuildUtilities.Core.ConsoleUi\Benday.BuildUtilities.Core.ConsoleUi.csproj

if exist %PublishToDir% (del %PublishToDir%\*.*)

dotnet restore %ProjectToBuildAndPublish%

dotnet build %ProjectToBuildAndPublish%

dotnet publish %ProjectToBuildAndPublish% -o %PublishToDir%
