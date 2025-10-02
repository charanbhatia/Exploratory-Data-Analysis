# Check if Python is installed
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Python Installation Checker" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$pythonInstalled = $false

# Try different Python commands
$pythonCommands = @("python", "python3", "py")

foreach ($cmd in $pythonCommands) {
    Write-Host "Checking for '$cmd'..." -ForegroundColor Yellow
    try {
        $version = & $cmd --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Found: $version" -ForegroundColor Green
            $pythonInstalled = $true
            $pythonCmd = $cmd
            break
        }
    } catch {
        Write-Host "✗ '$cmd' not found" -ForegroundColor Red
    }
}

Write-Host ""

if ($pythonInstalled) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✓ Python is installed!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Python command to use: $pythonCmd" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Navigate to backend: cd backend" -ForegroundColor White
    Write-Host "2. Run setup script: powershell -ExecutionPolicy Bypass -File .\setup-and-test.ps1" -ForegroundColor White
    Write-Host "   OR manually run:" -ForegroundColor White
    Write-Host "   $pythonCmd -m venv venv" -ForegroundColor Cyan
    Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor Cyan
    Write-Host "   pip install -r requirements.txt" -ForegroundColor Cyan
    Write-Host "   $pythonCmd manage.py migrate" -ForegroundColor Cyan
    Write-Host "   $pythonCmd manage.py runserver" -ForegroundColor Cyan
    
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "✗ Python is NOT installed" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please follow these steps to install Python:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Open your browser and go to:" -ForegroundColor White
    Write-Host "   https://www.python.org/downloads/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "2. Click the 'Download Python' button" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Run the installer" -ForegroundColor White
    Write-Host ""
    Write-Host "4. ⚠️  IMPORTANT: Check 'Add Python to PATH' ⚠️" -ForegroundColor Red
    Write-Host ""
    Write-Host "5. Click 'Install Now'" -ForegroundColor White
    Write-Host ""
    Write-Host "6. After installation, RESTART PowerShell" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "7. Run this script again to verify" -ForegroundColor White
    Write-Host ""
    Write-Host "For detailed instructions, see: INSTALL_PYTHON.md" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Opening Python download page in your browser..." -ForegroundColor Yellow
    Start-Process "https://www.python.org/downloads/"
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
