#!/bin/bash

publishToDir=./published/
projectToBuildAndPublish=./src/Benday.BuildUtilities.Core.ConsoleUi/Benday.BuildUtilities.Core.ConsoleUi.csproj

dotnet restore $projectToBuildAndPublish

dotnet build $projectToBuildAndPublish

dotnet publish $projectToBuildAndPublish -o $publishToDir
