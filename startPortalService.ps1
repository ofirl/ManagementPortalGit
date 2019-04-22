Set-Location $PSScriptRoot
Start-Process powershell.exe -ArgumentList '-Command "npm start; & pause;"','-NoExit'