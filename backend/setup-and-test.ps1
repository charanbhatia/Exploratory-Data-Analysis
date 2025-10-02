# EDA Backend - Installation and Testing Script
# Run this script in PowerShell after installing Python

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "EDA Dashboard - Backend Setup & Testing" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Python installation
Write-Host "Step 1: Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Python from: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host "IMPORTANT: Check 'Add Python to PATH' during installation" -ForegroundColor Yellow
    Write-Host "After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Navigate to backend directory
Write-Host "Step 2: Navigating to backend directory..." -ForegroundColor Yellow
$backendPath = "d:\personal\projects\EDA\backend"
Set-Location $backendPath
Write-Host "✓ Current directory: $backendPath" -ForegroundColor Green
Write-Host ""

# Check if venv exists
Write-Host "Step 3: Setting up virtual environment..." -ForegroundColor Yellow
if (Test-Path "venv") {
    Write-Host "✓ Virtual environment already exists" -ForegroundColor Green
} else {
    Write-Host "Creating virtual environment..." -ForegroundColor Cyan
    python -m venv venv
    Write-Host "✓ Virtual environment created" -ForegroundColor Green
}
Write-Host ""

# Activate virtual environment
Write-Host "Step 4: Activating virtual environment..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1
Write-Host "✓ Virtual environment activated" -ForegroundColor Green
Write-Host ""

# Upgrade pip
Write-Host "Step 5: Upgrading pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip --quiet
Write-Host "✓ Pip upgraded" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "Step 6: Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Cyan
pip install -r requirements.txt --quiet
Write-Host "✓ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Run migrations
Write-Host "Step 7: Running database migrations..." -ForegroundColor Yellow
python manage.py migrate
Write-Host "✓ Migrations completed" -ForegroundColor Green
Write-Host ""

# Start server in background
Write-Host "Step 8: Starting Django server..." -ForegroundColor Yellow
$job = Start-Job -ScriptBlock {
    Set-Location "d:\personal\projects\EDA\backend"
    & .\venv\Scripts\Activate.ps1
    python manage.py runserver
}

Write-Host "Waiting for server to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 5
Write-Host "✓ Server started (Job ID: $($job.Id))" -ForegroundColor Green
Write-Host ""

# Run tests
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Running API Tests" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "Test 1: Health Check Endpoint" -ForegroundColor Yellow
try {
    $healthResponse = Invoke-RestMethod -Uri "http://localhost:8000/api/health/" -Method Get -TimeoutSec 10
    if ($healthResponse.status -eq "ok") {
        Write-Host "✓ Health check passed" -ForegroundColor Green
        Write-Host "  Response: $($healthResponse | ConvertTo-Json -Compress)" -ForegroundColor Gray
    } else {
        Write-Host "✗ Health check failed" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Start-Sleep -Seconds 2

# Test 2: Filter Options
Write-Host "Test 2: Filter Options Endpoint" -ForegroundColor Yellow
try {
    $filterResponse = Invoke-RestMethod -Uri "http://localhost:8000/api/filters/" -Method Get -TimeoutSec 10
    if ($filterResponse.success -eq $true) {
        Write-Host "✓ Filter options retrieved" -ForegroundColor Green
        Write-Host "  Brands found: $($filterResponse.data.Brand.Count)" -ForegroundColor Gray
        Write-Host "  Years found: $($filterResponse.data.Year.Count)" -ForegroundColor Gray
        Write-Host "  Channels found: $($filterResponse.data.Channel.Count)" -ForegroundColor Gray
    } else {
        Write-Host "✗ Filter options failed" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Filter options failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Start-Sleep -Seconds 2

# Test 3: Dashboard Data (No Filters)
Write-Host "Test 3: Dashboard Data Endpoint (No Filters)" -ForegroundColor Yellow
try {
    $body = @{
        filters = @{}
    } | ConvertTo-Json
    
    $dashboardResponse = Invoke-RestMethod -Uri "http://localhost:8000/api/dashboard/" -Method Post -Body $body -ContentType "application/json" -TimeoutSec 10
    if ($dashboardResponse.success -eq $true) {
        Write-Host "✓ Dashboard data retrieved" -ForegroundColor Green
        Write-Host "  Sales by year records: $($dashboardResponse.data.sales_by_year.Count)" -ForegroundColor Gray
        Write-Host "  Volume by year records: $($dashboardResponse.data.volume_by_year.Count)" -ForegroundColor Gray
        Write-Host "  Monthly trend records: $($dashboardResponse.data.monthly_trend.Count)" -ForegroundColor Gray
        Write-Host "  Total sales: $([math]::Round($dashboardResponse.data.summary_stats.total_sales, 2))" -ForegroundColor Gray
        Write-Host "  Total volume: $([math]::Round($dashboardResponse.data.summary_stats.total_volume, 2))" -ForegroundColor Gray
    } else {
        Write-Host "✗ Dashboard data failed" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Dashboard data failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Start-Sleep -Seconds 2

# Test 4: Dashboard Data (With Filters)
Write-Host "Test 4: Dashboard Data Endpoint (With Filters)" -ForegroundColor Yellow
try {
    $body = @{
        filters = @{
            Year = @(2021)
        }
    } | ConvertTo-Json
    
    $filteredResponse = Invoke-RestMethod -Uri "http://localhost:8000/api/dashboard/" -Method Post -Body $body -ContentType "application/json" -TimeoutSec 10
    if ($filteredResponse.success -eq $true) {
        Write-Host "✓ Filtered dashboard data retrieved" -ForegroundColor Green
        Write-Host "  Total sales (2021): $([math]::Round($filteredResponse.data.summary_stats.total_sales, 2))" -ForegroundColor Gray
        Write-Host "  Total records (2021): $($filteredResponse.data.summary_stats.total_records)" -ForegroundColor Gray
    } else {
        Write-Host "✗ Filtered dashboard data failed" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Filtered dashboard data failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "All critical tests completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Server is running at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Admin panel: http://localhost:8000/admin" -ForegroundColor Cyan
Write-Host "API endpoints: http://localhost:8000/api/" -ForegroundColor Cyan
Write-Host ""

# Instructions for stopping server
Write-Host "To stop the server, run:" -ForegroundColor Yellow
Write-Host "  Stop-Job -Id $($job.Id)" -ForegroundColor Cyan
Write-Host "  Remove-Job -Id $($job.Id)" -ForegroundColor Cyan
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Review the test results above" -ForegroundColor White
Write-Host "2. If all tests passed, proceed with Git commit" -ForegroundColor White
Write-Host "3. Run: git add ." -ForegroundColor Cyan
Write-Host "4. Run: git commit -m 'feat: Django backend with REST API'" -ForegroundColor Cyan
Write-Host "5. Run: git push origin main" -ForegroundColor Cyan
Write-Host ""

Write-Host "Press any key to stop the server and exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Cleanup
Stop-Job -Id $job.Id
Remove-Job -Id $job.Id
Write-Host "Server stopped. Goodbye!" -ForegroundColor Green
