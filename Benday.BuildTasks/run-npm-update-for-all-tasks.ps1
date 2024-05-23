$base = Get-Location

function RunCommands {
    param (
        [string]$taskDirName
    )
    Write-Host "-----"
    $pathToDir = Join-Path -Path $base -ChildPath $taskDirName
    Write-Host "starting work on $taskDirName"
    Write-Host "changing dir to $pathToDir"
    Set-Location -Path $pathToDir
    npm update
    npm audit fix
    Write-Host "finished $taskDirName"
    Write-Host "-----"
    Set-Location -Path $base
}

RunCommands -taskDirName "runsqlcmd"
RunCommands -taskDirName "setappconfigconnectionstring"
RunCommands -taskDirName "setappconfigappsetting"
RunCommands -taskDirName "setjsonconfigconnectionstring"
RunCommands -taskDirName "deployefcoremigrations"
RunCommands -taskDirName "setjsonvalue"