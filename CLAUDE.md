# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains Azure DevOps build and release pipeline tasks/extensions. It provides utilities for deploying EF Core migrations, running SQL scripts, and editing configuration files (app.config, web.config, appsettings.json).

## Repository Structure

- **Benday.BuildTasks/** - Azure DevOps extension with TypeScript-based pipeline tasks
  - Each subdirectory (deployefcoremigrations, runsqlcmd, setappconfigappsetting, etc.) is an individual task
  - Tasks use `azure-pipelines-task-lib` for Azure DevOps integration
  - `vss-extension.json` defines the extension manifest

- **Benday.BuildUtilities.Core/** - .NET 8.0 console application (`BendayBuildConfigUtilCore.exe`)
  - Used by the Azure DevOps tasks for app.config/web.config editing operations
  - Commands: getappsetting, setappsetting, replacetoken, getconnectionstring, setconnectionstring, setxmlattribute, setjsonvalue, listmigrations

## Build Commands

### TypeScript Tasks (Benday.BuildTasks/)

```powershell
# Install npm packages for all tasks
.\run-npm-install-for-all-tasks.ps1

# Compile TypeScript and create VSIX package
.\create-vsix.ps1

# Update version numbers across all tasks (uses slnutil)
.\update-version-numbers.ps1 -minorVersion <number>
```

### .NET Core Console App (Benday.BuildUtilities.Core/)

```bash
# Build and publish
cd Benday.BuildUtilities.Core
.\build-and-publish.bat   # Windows
./build-and-publish.sh    # macOS/Linux

# Or manually:
dotnet restore src/Benday.BuildUtilities.Core.ConsoleUi/Benday.BuildUtilities.Core.ConsoleUi.csproj
dotnet build src/Benday.BuildUtilities.Core.ConsoleUi/Benday.BuildUtilities.Core.ConsoleUi.csproj
dotnet publish src/Benday.BuildUtilities.Core.ConsoleUi/Benday.BuildUtilities.Core.ConsoleUi.csproj -o ./published/
```

### Running Tests

```bash
cd Benday.BuildUtilities.Core
dotnet test Test/Benday.BuildUtilities.Core.Tests/Benday.BuildUtilities.Core.Tests.csproj
```

## Architecture Notes

- The Azure DevOps tasks (TypeScript) invoke the .NET console app for XML config file operations
- The `ef.dll` bundled in `deployefcoremigrations/` task is used to execute EF Core migrations via `dotnet exec`
- JSON editing is implemented in both TypeScript (`JsonEditor.ts`) and C# (`JsonEditor.cs`) - the TypeScript version is used directly by tasks, while C# is used by the console app
- Each task has a `task.json` that defines inputs/outputs for Azure DevOps

## Key Dependencies

- TypeScript tasks require: Node.js, `tsc`, `tfx-cli` (for VSIX packaging)
- .NET console app requires: .NET 8.0 SDK
- Version updates use `slnutil` CLI tool (external dependency)
