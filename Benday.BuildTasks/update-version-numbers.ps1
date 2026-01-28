param (
    [Parameter(Mandatory=$true)]
    [string]$minorVersion
)

#
# MAJOR VERSION NUMBER
#
$majorVersionNumber = 4

function Update-VersionForExtension {
    param (
        [Parameter(Mandatory=$true)]
        [string]$minorVersion
    )

    $filename = "./vss-extension.json"
    & slnutil setjsonvalue /filename:$filename /level1:version /value:"$majorVersionNumber.$minorVersion.0"
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

    & slnutil setjsonvalue /filename:$filename /level1:version /level2:Major /value:$majorVersionNumber
    & slnutil setjsonvalue /filename:$filename /level1:version /level2:Minor /value:$minorVersion
}

Update-VersionForExtension -minorVersion $minorVersion
Update-VersionForExtensionTask -directoryName "deployefcoremigrations" -minorVersion $minorVersion
Update-VersionForExtensionTask -directoryName "runsqlcmd" -minorVersion $minorVersion
Update-VersionForExtensionTask -directoryName "setappconfigappsetting" -minorVersion $minorVersion
Update-VersionForExtensionTask -directoryName "setappconfigconnectionstring" -minorVersion $minorVersion
Update-VersionForExtensionTask -directoryName "setjsonconfigconnectionstring" -minorVersion $minorVersion
Update-VersionForExtensionTask -directoryName "setjsonvalue" -minorVersion $minorVersion