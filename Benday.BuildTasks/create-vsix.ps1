$base = Get-Location

function CompileTask {
    param (
        [string]$taskDirName
    )
    Write-Host "-----"
    $pathToDir = Join-Path -Path $base -ChildPath $taskDirName
    Write-Host "starting work on $taskDirName"
    Write-Host "changing dir to $pathToDir"
    Set-Location -Path $pathToDir
    tsc
    Write-Host "finished compiling $taskDirName"
    Write-Host "-----"
    Set-Location -Path $base
}

CompileTask -taskDirName "runsqlcmd"
CompileTask -taskDirName "setappconfigconnectionstring"
CompileTask -taskDirName "setappconfigappsetting"
CompileTask -taskDirName "setjsonconfigconnectionstring"
CompileTask -taskDirName "deployefcoremigrations"
CompileTask -taskDirName "setjsonvalue"

tfx extension create --manifest-globs vss-extension.json