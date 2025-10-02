# Manual Testing Guide

## Prerequisites Check

Before starting, ensure Python is installed:
```powershell
python --version
```

You should see: `Python 3.x.x`

If not, install Python from: https://www.python.org/downloads/
⚠️ **CHECK "Add Python to PATH" during installation!**

## Setup Steps

### 1. Create Virtual Environment
```powershell
cd d:\personal\projects\EDA\backend
python -m venv venv
```

### 2. Activate Virtual Environment
```powershell
.\venv\Scripts\Activate.ps1
```

You should see `(venv)` in your prompt.

**If you get an execution policy error:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 3. Install Dependencies
```powershell
pip install -r requirements.txt
```

Wait for all packages to install...

### 4. Run Migrations
```powershell
python manage.py migrate
```

### 5. Start Server
```powershell
python manage.py runserver
```

Leave this terminal running. You should see:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

## Testing (Open New PowerShell)

Open a **NEW** PowerShell window and run these tests:

### Test 1: Health Check ✓
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/health/"
```

**Expected Output:**
```
status  message
------  -------
ok      EDA API is running
```

### Test 2: Get Filters ✓
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:8000/api/filters/"
$response.data
```

**Expected Output:** You should see lists of brands, years, channels, etc.

### Test 3: Get Dashboard Data ✓
```powershell
$body = @{ filters = @{} } | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:8000/api/dashboard/" -Method Post -Body $body -ContentType "application/json"
$response.data.summary_stats
```

**Expected Output:** Summary statistics with total_sales, total_volume, etc.

### Test 4: Get Filtered Data ✓
```powershell
$body = @{
    filters = @{
        Year = @(2021)
        Brand = @("Brand 1")
    }
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:8000/api/dashboard/" -Method Post -Body $body -ContentType "application/json"
$response.data.summary_stats
```

**Expected Output:** Filtered statistics for 2021 and Brand 1 only.

### Test 5: Market Share ✓
```powershell
$body = @{
    filters = @{}
    metric = "sales"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:8000/api/market-share/" -Method Post -Body $body -ContentType "application/json"
$response.data[0..4]
```

**Expected Output:** Top 5 brands with their market share percentages.

## Verification Checklist

- [ ] Python is installed and in PATH
- [ ] Virtual environment created successfully
- [ ] All dependencies installed without errors
- [ ] Migrations completed successfully
- [ ] Server starts without errors
- [ ] Health check returns "ok"
- [ ] Filter options return data
- [ ] Dashboard data returns all chart data
- [ ] Filtered data returns correct subset
- [ ] Market share calculations work

## If Everything Works ✓

You're ready to commit and push to GitHub!

```powershell
# Stop the server (Ctrl+C in server terminal)

# Navigate to project root
cd d:\personal\projects\EDA

# Initialize git if not already done
git init

# Add files
git add .

# Check what will be committed
git status

# Commit
git commit -m "feat: Django backend with REST API for EDA dashboard

- Implemented Django REST Framework backend
- Created data service for CSV processing with pandas
- Added API endpoints for filters and dashboard data
- Configured CORS for frontend integration
- Implemented dynamic filtering and aggregations
- Added comprehensive error handling
- Created setup and testing documentation"

# Create .gitignore for root
```

Create `.gitignore` in root:
```
# Python
*.pyc
__pycache__/
*.py[cod]
*$py.class
venv/
env/
*.sqlite3

# Node
node_modules/
npm-debug.log
yarn-error.log
.env.local
build/
dist/

# IDEs
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Project specific
backend/staticfiles/
backend/media/
frontend/build/
```

```powershell
# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/eda-dashboard.git

# Push to GitHub
git push -u origin main
```

## Troubleshooting

### Issue: "python is not recognized"
**Solution:** Install Python and restart PowerShell

### Issue: "execution policy" error
**Solution:** Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Issue: Port 8000 in use
**Solution:** `python manage.py runserver 8001`

### Issue: Module not found
**Solution:** Make sure virtual environment is activated (`.\venv\Scripts\Activate.ps1`)

### Issue: Data file not found
**Solution:** Ensure "Technical Evaluation.csv" is in the root directory

## Server Management

### Start Server
```powershell
cd d:\personal\projects\EDA\backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

### Stop Server
Press `Ctrl+C` in the terminal running the server

### Run in Background (PowerShell)
```powershell
Start-Job -ScriptBlock {
    Set-Location "d:\personal\projects\EDA\backend"
    & .\venv\Scripts\Activate.ps1
    python manage.py runserver
}
```

### Check Background Jobs
```powershell
Get-Job
```

### Stop Background Job
```powershell
Stop-Job -Id <JobId>
Remove-Job -Id <JobId>
```

## Next Steps After Successful Testing

1. ✅ Backend tested and working
2. ⏳ Commit and push to GitHub
3. ⏳ Create React frontend
4. ⏳ Integrate charts
5. ⏳ Connect frontend to backend
6. ⏳ Deploy application

---

**Ready to proceed with Git push?** Make sure all tests passed! ✓
