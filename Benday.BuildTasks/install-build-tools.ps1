# Install TypeScript and TFX CLI for building Azure DevOps extensions
# This script installs the required global npm packages needed to compile and package the extension

Write-Host "Installing build tools for Azure DevOps extension development..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "  Node.js version: $nodeVersion" -ForegroundColor Green
    Write-Host "  npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "  Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Install TypeScript globally
Write-Host "Installing TypeScript compiler (tsc)..." -ForegroundColor Cyan
try {
    npm install -g typescript
    $tscVersion = tsc --version
    Write-Host "  Successfully installed: $tscVersion" -ForegroundColor Green
} catch {
    Write-Host "  ERROR: Failed to install TypeScript" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install TFX CLI globally
Write-Host "Installing TFX CLI (Azure DevOps Extension CLI)..." -ForegroundColor Cyan
try {
    npm install -g tfx-cli
    $tfxVersion = tfx --version
    Write-Host "  Successfully installed: tfx-cli version $tfxVersion" -ForegroundColor Green
} catch {
    Write-Host "  ERROR: Failed to install TFX CLI" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Build tools installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Run .\run-npm-install-for-all-tasks.ps1 to install task dependencies" -ForegroundColor White
Write-Host "  2. Run .\create-vsix.ps1 to compile and package the extension" -ForegroundColor White
Write-Host ""
