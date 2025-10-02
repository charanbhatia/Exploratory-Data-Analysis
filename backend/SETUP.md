# Backend Setup and Testing Guide

## Quick Start

### 1. Install Python

**Download Python 3.9 or higher:**
- Go to: https://www.python.org/downloads/
- Download the latest version for Windows
- **IMPORTANT**: During installation, check ✅ "Add Python to PATH"
- Complete the installation
- **Restart your terminal/PowerShell**

### 2. Verify Python Installation

Open PowerShell and run:
```powershell
python --version
```

If you see `Python 3.x.x`, you're good to go!

If not, try:
```powershell
python3 --version
```

### 3. Setup Virtual Environment

```powershell
# Navigate to backend directory
cd d:\personal\projects\EDA\backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# If you get execution policy error, run this first:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 4. Install Dependencies

```powershell
# Make sure virtual environment is activated (you should see (venv) in prompt)
pip install -r requirements.txt
```

### 5. Run Migrations

```powershell
python manage.py migrate
```

### 6. Test the Backend

```powershell
# Start the Django server
python manage.py runserver
```

You should see:
```
Starting development server at http://127.0.0.1:8000/
```

### 7. Test API Endpoints

Open a **new PowerShell window** and run these tests:

**Test 1: Health Check**
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/health/"
```

**Test 2: Get Filter Options**
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/filters/"
```

**Test 3: Get Dashboard Data**
```powershell
$body = @{
    filters = @{}
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/dashboard/" -Method Post -Body $body -ContentType "application/json"
```

**Test 4: Get Dashboard Data with Filters**
```powershell
$body = @{
    filters = @{
        Year = @(2021)
        Brand = @("Brand 1")
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/dashboard/" -Method Post -Body $body -ContentType "application/json"
```

## Expected Test Results

### Test 1 - Health Check
```json
{
  "status": "ok",
  "message": "EDA API is running"
}
```

### Test 2 - Filter Options
```json
{
  "success": true,
  "data": {
    "Brand": ["Brand 1", "Brand 2", ...],
    "PackType": ["Small Single", "Standard Single", ...],
    "PPG": ["Small Single", "Standard Single", ...],
    "Channel": ["Convenience", ...],
    "Year": ["2021", "2022", ...]
  }
}
```

### Test 3 - Dashboard Data
```json
{
  "success": true,
  "data": {
    "sales_by_year": [...],
    "volume_by_year": [...],
    "monthly_trend": [...],
    "market_share_sales": [...],
    "market_share_volume": [...],
    "summary_stats": {...},
    "sales_by_channel": [...],
    "sales_by_pack_type": [...]
  }
}
```

## Common Issues and Solutions

### Issue: "python is not recognized"
**Solution**: 
1. Install Python from python.org
2. During installation, check "Add Python to PATH"
3. Restart PowerShell
4. Try again

### Issue: "Cannot run script... execution policy"
**Solution**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: "pip is not recognized"
**Solution**:
```powershell
python -m pip install --upgrade pip
```

### Issue: Port 8000 already in use
**Solution**:
```powershell
python manage.py runserver 8001
```

### Issue: Data file not found
**Solution**: 
- Make sure "Technical Evaluation.csv" is in the root directory (d:\personal\projects\EDA\)
- Check the path in backend/eda_project/settings.py

## Git Push Checklist

Before pushing to GitHub:

- [ ] All tests pass successfully
- [ ] Server starts without errors
- [ ] API endpoints return data
- [ ] No sensitive information in code (SECRET_KEY is placeholder)
- [ ] .gitignore is properly configured
- [ ] README.md is updated

## Git Commands

```powershell
# Navigate to project root
cd d:\personal\projects\EDA

# Initialize git (if not already done)
git init

# Check status
git status

# Add all files
git add .

# Commit
git commit -m "feat: Django backend with REST API and data processing"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/eda-dashboard.git

# Push to GitHub
git push -u origin main
```

## What We Built

✅ **Django Project Structure**
- Settings configured with CORS
- REST Framework integrated
- URL routing setup

✅ **Data Service**
- CSV data loading with pandas
- Filter functionality
- Multiple aggregation methods
- Caching for performance

✅ **API Endpoints**
- Health check
- Filter options
- Dashboard data (all charts)
- Individual chart endpoints
- Summary statistics

✅ **Features**
- Dynamic filtering by Brand, PackType, PPG, Channel, Year
- Sales and volume aggregations
- Monthly trend analysis
- Market share calculations
- Clean error handling

## Next Steps

After successful testing and Git push:
1. ✅ Backend tested and pushed to GitHub
2. ⏳ Create React frontend
3. ⏳ Integrate chart libraries
4. ⏳ Connect frontend to backend API
5. ⏳ Implement responsive design
6. ⏳ Deploy application

---

**Current Status**: Backend Development ✅
**Next**: Frontend Development 🚀
