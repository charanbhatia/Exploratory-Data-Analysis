# 🚀 QUICK START GUIDE

## Before You Start

**You need to install Python first!**

### Install Python (5 minutes)

1. Go to: **https://www.python.org/downloads/**
2. Click "Download Python 3.x.x" (latest version)
3. Run the installer
4. ⚠️ **VERY IMPORTANT**: Check the box "Add Python to PATH"
5. Click "Install Now"
6. Wait for installation to complete
7. **Restart PowerShell** (close and reopen)

### Verify Python Installation

Open PowerShell and type:
```powershell
python --version
```

If you see `Python 3.x.x`, you're ready! 🎉

---

## Backend Setup (10 minutes)

### Option 1: Automated Setup (Recommended) ✨

```powershell
# Navigate to backend folder
cd d:\personal\projects\EDA\backend

# Run the automated setup script
powershell -ExecutionPolicy Bypass -File .\setup-and-test.ps1
```

This script will:
- Create virtual environment
- Install all dependencies
- Run database migrations
- Start the server
- Run all tests automatically
- Show you the results

### Option 2: Manual Setup

If the automated script doesn't work, follow these steps:

```powershell
# 1. Navigate to backend
cd d:\personal\projects\EDA\backend

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment
.\venv\Scripts\Activate.ps1

# If you get execution policy error:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# Then try step 3 again

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run migrations
python manage.py migrate

# 6. Start server
python manage.py runserver
```

---

## Test the Backend (5 minutes)

**Open a NEW PowerShell window** (keep the server running in the first one)

```powershell
# Test 1: Health Check
Invoke-RestMethod -Uri "http://localhost:8000/api/health/"

# Test 2: Get Filters
Invoke-RestMethod -Uri "http://localhost:8000/api/filters/"

# Test 3: Get Dashboard Data
$body = @{ filters = @{} } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8000/api/dashboard/" -Method Post -Body $body -ContentType "application/json"
```

**If all tests return data, you're good!** ✅

---

## Push to GitHub (5 minutes)

Stop the server (Ctrl+C) and run:

```powershell
# Navigate to project root
cd d:\personal\projects\EDA

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "feat: Django backend with REST API for EDA dashboard"

# Add your GitHub repository (replace with your URL)
git remote add origin https://github.com/yourusername/eda-dashboard.git

# Push to GitHub
git push -u origin main
```

---

## What You Just Built 🎉

✅ **Django Backend** with REST API
✅ **8 API Endpoints** for data and filters
✅ **Data Processing** with Pandas
✅ **Dynamic Filtering** by multiple dimensions
✅ **Aggregations** for all chart types
✅ **CORS Configuration** for React frontend
✅ **Error Handling** and validation
✅ **Comprehensive Documentation**

---

## API Endpoints Available

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health/` | GET | Check if API is running |
| `/api/filters/` | GET | Get all filter options |
| `/api/dashboard/` | POST | Get all chart data |
| `/api/sales-by-year/` | POST | Sales by year |
| `/api/volume-by-year/` | POST | Volume by year |
| `/api/monthly-trend/` | POST | Monthly sales trend |
| `/api/market-share/` | POST | Market share data |
| `/api/summary/` | POST | Summary statistics |

---

## Next Steps

1. ✅ Backend tested and pushed to GitHub
2. ⏳ Create React frontend
3. ⏳ Build dashboard UI with filters
4. ⏳ Add chart components
5. ⏳ Connect to backend API
6. ⏳ Deploy application

---

## Need Help?

### Common Issues:

**"python is not recognized"**
- Install Python from python.org
- Check "Add to PATH" during installation
- Restart PowerShell

**"Cannot run script... execution policy"**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**"Port 8000 already in use"**
```powershell
python manage.py runserver 8001
```

**Tests not working**
- Make sure server is running
- Make sure "Technical Evaluation.csv" is in root folder
- Check for error messages in server terminal

---

## Documentation Files

- **README.md** - Complete project overview
- **backend/SETUP.md** - Detailed backend setup guide
- **backend/TESTING.md** - Manual testing instructions
- **backend/setup-and-test.ps1** - Automated setup script

---

**Ready to continue?** Let me know when you've successfully tested the backend and pushed to GitHub! 🚀
