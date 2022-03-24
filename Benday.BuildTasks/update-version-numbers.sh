#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "No arguments supplied for minor version"
    exit 1
fi

majorVersionNumber=2
pathToBendayBuildConfigUtilCoreDll="../Benday.BuildUtilities.Core/published/BendayBuildConfigUtilCore.dll"    

updateVersionForExtension () {
    if [ $# -ne 1 ]
    then
        echo "There should be an arg for minor version"
        exit 1
    fi
    
    minorVersion=$1
    filename="./vss-extension.json"
    dotnet $pathToBendayBuildConfigUtilCoreDll setjsonvalue /filename:$filename /level1:version /value:"$majorVersionNumber.$minorVersion.0"
}

updateVersionForExtensionTask () {
    if [ $# -eq 0 ]
    then
        echo "No directory name"
        exit 1
    fi

    if [ $# -ne 2 ]
    then
        echo "There should be an arg for minor version and an arg for path"
        exit 1
    fi
    
    directoryName=$1
    minorVersion=$2
    filename="./$directoryName/task.json"
    
    echo "updating $directoryName to $majorVersionNumber.$minorVersion"

    dotnet $pathToBendayBuildConfigUtilCoreDll setjsonvalue /filename:$filename /level1:version /level2:Major /value:$majorVersionNumber
    dotnet $pathToBendayBuildConfigUtilCoreDll setjsonvalue /filename:$filename /level1:version /level2:Minor /value:$minorVersion
}

updateVersionForExtension $1
updateVersionForExtensionTask setappconfigappsetting $1 
updateVersionForExtensionTask setappconfigconnectionstring $1 
updateVersionForExtensionTask setjsonconfigconnectionstring $1 
updateVersionForExtensionTask setjsonvalue $1 
updateVersionForExtensionTask runsqlcmd $1 

echo version numbers are updated

