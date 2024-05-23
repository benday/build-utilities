param (
    [Parameter(Mandatory=$true)]
    [string]$minorVersion
)

$majorVersionNumber = 2
$pathToBendayBuildConfigUtilCoreDll = "../Benday.BuildUtilities.Core/published/BendayBuildConfigUtilCore.dll"

function Update-VersionForExtension {
    param (
        [Parameter(Mandatory=$true)]
        [string]$minorVersion
    )

    $filename = "./vss-extension.json"
    & dotnet $pathToBendayBuildConfigUtilCoreDll setjsonvalue /filename:$filename /level1:version /value:"$majorVersionNumber.$minorVersion.0"
}

function Update-VersionForExtensionTask {
    param (
        [Parameter(Mandatory=$true)]
        [string]$directoryName,
        [Parameter(Mandatory=$true)]
        [string]$minorVersion
    )

    $filename = "./$directoryName/task.json"

    Write-Host "updating $directoryName to $majorVersionNumber.$minorVersion"

    & dotnet $pathToBendayBuildConfigUtilCoreDll setjsonvalue /filename:$filename /level1:version /level2:Major /value:$majorVersionNumber
    & dotnet $pathToBendayBuildConfigUtilCoreDll setjsonvalue /filename:$filename /level1:version /level2:Minor /value:$minorVersion
}

Update-VersionForExtension -minorVersion $minorVersion
Update-VersionForExtensionTask -directoryName "setappconfigappsetting" -minorVersion $minorVersion
Update-VersionForExtensionTask -directoryName "setappconfigconnectionstring" -minorVersion $minorVersion