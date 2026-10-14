$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

if ($env:OS -ne "Windows_NT") {
  throw "Este instalador deve ser executado no Windows PowerShell."
}

$releaseBase = "https://github.com/bewayio/homebrew-bcode/releases/latest/download"
$assetName = "cortex-windows-amd64.zip"
$installDir = Join-Path $env:LOCALAPPDATA "Programs\Cortex"
$startMenuDir = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"
$startMenuLink = Join-Path $startMenuDir "Cortex.lnk"
$tempDir = Join-Path $env:TEMP ("cortex-install-" + [guid]::NewGuid().ToString("N"))

$runningProcess = Get-Process -Name "cortex" -ErrorAction SilentlyContinue
if ($runningProcess) {
  throw "Feche o Cortex antes de instalar ou atualizar."
}

New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

try {
  $checksumsPath = Join-Path $tempDir "checksums.txt"
  $archivePath = Join-Path $tempDir $assetName
  $extractDir = Join-Path $tempDir "extracted"

  Write-Host "Obtendo a lista de checksums..."
  Invoke-WebRequest -Uri "$releaseBase/checksums.txt" -OutFile $checksumsPath -UseBasicParsing

  $expectedHash = $null
  foreach ($line in Get-Content -LiteralPath $checksumsPath) {
    if ($line -match "^\s*([0-9a-fA-F]{64})\s+\*?$([regex]::Escape($assetName))\s*$") {
      $expectedHash = $Matches[1].ToLowerInvariant()
      break
    }
  }
  if (-not $expectedHash) {
    throw "O checksum de $assetName não foi encontrado. Nenhum arquivo foi instalado."
  }

  Write-Host "Baixando $assetName..."
  Invoke-WebRequest -Uri "$releaseBase/$assetName" -OutFile $archivePath -UseBasicParsing
  $actualHash = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash.ToLowerInvariant()
  if ($actualHash -ne $expectedHash) {
    throw "Checksum inválido para $assetName. A instalação foi cancelada."
  }

  Expand-Archive -LiteralPath $archivePath -DestinationPath $extractDir -Force
  $sourceExe = Get-ChildItem -LiteralPath $extractDir -Filter "cortex.exe" -File -Recurse | Select-Object -First 1
  if (-not $sourceExe) {
    throw "O pacote não contém cortex.exe."
  }

  New-Item -ItemType Directory -Path $installDir -Force | Out-Null
  $sourceDir = $sourceExe.DirectoryName
  Get-ChildItem -LiteralPath $sourceDir -Force | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $installDir -Recurse -Force
  }

  $installedExe = Join-Path $installDir "cortex.exe"
  if (-not (Test-Path -LiteralPath $installedExe -PathType Leaf)) {
    $installedExeItem = Get-ChildItem -LiteralPath $installDir -Filter "cortex.exe" -File -Recurse | Select-Object -First 1
    if (-not $installedExeItem) {
      throw "Não foi possível localizar cortex.exe após a extração."
    }
    $installedExe = $installedExeItem.FullName
  }

  $uninstallerPath = Join-Path $installDir "uninstall-cortex.ps1"
  @'
$ErrorActionPreference = "SilentlyContinue"
$installDir = $PSScriptRoot
$startMenuLink = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\Cortex.lnk"
$appPathKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\App Paths\cortex.exe"
$uninstallKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Cortex"

Remove-Item -LiteralPath $startMenuLink -Force
Remove-Item -LiteralPath $appPathKey -Recurse -Force
Remove-Item -LiteralPath $uninstallKey -Recurse -Force
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$remainingPaths = @($userPath -split ";" | Where-Object { $_.TrimEnd("\") -ine $installDir.TrimEnd("\") -and $_.Trim() })
if ($remainingPaths.Count -gt 0) {
  [Environment]::SetEnvironmentVariable("Path", ($remainingPaths -join ";"), "User")
} else {
  [Environment]::SetEnvironmentVariable("Path", $null, "User")
}
Start-Sleep -Milliseconds 300
Remove-Item -LiteralPath $installDir -Recurse -Force
'@ | Set-Content -LiteralPath $uninstallerPath -Encoding UTF8

  New-Item -ItemType Directory -Path $startMenuDir -Force | Out-Null
  $shell = New-Object -ComObject WScript.Shell
  $shortcut = $shell.CreateShortcut($startMenuLink)
  $shortcut.TargetPath = $installedExe
  $shortcut.WorkingDirectory = $installDir
  $shortcut.Description = "Cortex"
  $shortcut.Save()

  $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
  $pathEntries = @($userPath -split ";" | Where-Object { $_.Trim() })
  if (-not ($pathEntries | Where-Object { $_.TrimEnd("\") -ieq $installDir.TrimEnd("\") })) {
    $pathEntries += $installDir
    [Environment]::SetEnvironmentVariable("Path", ($pathEntries -join ";"), "User")
  }
  if (($env:Path -split ";") -notcontains $installDir) {
    $env:Path = "$installDir;$env:Path"
  }

  $appPathKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\App Paths\cortex.exe"
  New-Item -Path $appPathKey -Force | Out-Null
  Set-Item -Path $appPathKey -Value $installedExe
  New-ItemProperty -Path $appPathKey -Name "Path" -Value $installDir -PropertyType String -Force | Out-Null

  $uninstallKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Cortex"
  New-Item -Path $uninstallKey -Force | Out-Null
  $version = (Get-Item -LiteralPath $installedExe).VersionInfo.ProductVersion
  if (-not $version) { $version = "Latest" }
  $uninstallCommand = "powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$uninstallerPath`""
  New-ItemProperty -Path $uninstallKey -Name "DisplayName" -Value "Cortex" -PropertyType String -Force | Out-Null
  New-ItemProperty -Path $uninstallKey -Name "DisplayVersion" -Value $version -PropertyType String -Force | Out-Null
  New-ItemProperty -Path $uninstallKey -Name "Publisher" -Value "Cortex" -PropertyType String -Force | Out-Null
  New-ItemProperty -Path $uninstallKey -Name "InstallLocation" -Value $installDir -PropertyType String -Force | Out-Null
  New-ItemProperty -Path $uninstallKey -Name "DisplayIcon" -Value $installedExe -PropertyType String -Force | Out-Null
  New-ItemProperty -Path $uninstallKey -Name "UninstallString" -Value $uninstallCommand -PropertyType String -Force | Out-Null
  New-ItemProperty -Path $uninstallKey -Name "NoModify" -Value 1 -PropertyType DWord -Force | Out-Null
  New-ItemProperty -Path $uninstallKey -Name "NoRepair" -Value 1 -PropertyType DWord -Force | Out-Null

  Write-Host "Cortex instalado em $installDir"
  Write-Host "Atalho criado no menu Iniciar. PATH e registro de desinstalação atualizados para este usuário."
  Write-Host "Abra um novo terminal para executar cortex.exe pelo PATH."
  Write-Host "Instalação concluída."
}
finally {
  Remove-Item -LiteralPath $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}