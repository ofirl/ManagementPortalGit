Set-Location $PSScriptRoot
Start-Process powershell.exe -ArgumentList '-Command "npm start; & pause;"','-NoExit'
Start-Process powershell.exe -ArgumentList '-Command "npm run storybook"','-NoExit'
Start-Process powershell.exe -ArgumentList '-Command "npm test"','-NoExit'