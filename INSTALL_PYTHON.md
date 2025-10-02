# 🐍 Python Installation Guide for Windows

## Step 1: Download Python

1. Open your web browser
2. Go to: **https://www.python.org/downloads/**
3. You'll see a big yellow button that says **"Download Python 3.x.x"**
4. Click that button to download the installer

## Step 2: Install Python

⚠️ **CRITICAL STEP - DON'T SKIP THIS!**

1. **Run the downloaded installer** (python-3.x.x-amd64.exe)

2. **BEFORE clicking anything else:**
   - ✅ **CHECK the box at the bottom that says "Add Python to PATH"**
   - This is THE MOST IMPORTANT STEP!
   
   ```
   ┌──────────────────────────────────────────┐
   │  Install Python 3.x.x                    │
   ├──────────────────────────────────────────┤
   │                                          │
   │  ☐ Install launcher for all users       │
   │  ☑ Add Python to PATH  ← CHECK THIS!   │
   │                                          │
   │  [ Install Now ]                         │
   │  [ Customize installation ]              │
   │                                          │
   └──────────────────────────────────────────┘
   ```

3. **Click "Install Now"** (the default option is fine)

4. Wait for the installation to complete (2-3 minutes)

5. You should see **"Setup was successful"**

6. Click **"Close"**

## Step 3: Restart PowerShell

**IMPORTANT:** You MUST restart PowerShell for PATH changes to take effect

1. Close ALL PowerShell windows
2. Open a NEW PowerShell window

## Step 4: Verify Installation

In the new PowerShell window, type:

```powershell
python --version
```

You should see something like:
```
Python 3.12.0
```

Also verify pip (Python package installer):
```powershell
pip --version
```

You should see:
```
pip 23.x.x from ...
```

## ✅ If You See Python Version

**Success!** Python is installed correctly. 

**Next step:** Run this command to continue with backend setup:

```powershell
cd d:\personal\projects\EDA\backend
powershell -ExecutionPolicy Bypass -File .\setup-and-test.ps1
```

## ❌ If You Get "python is not recognized"

### Solution 1: Try python3
```powershell
python3 --version
```

### Solution 2: Reinstall Python
1. Uninstall Python from Windows Settings → Apps
2. Restart your computer
3. Download Python again
4. During installation, **MAKE SURE to check "Add Python to PATH"**
5. Install
6. Restart PowerShell
7. Try again

### Solution 3: Manually Add to PATH
If Python is installed but not in PATH:

1. Find where Python is installed (usually):
   - `C:\Users\YourUsername\AppData\Local\Programs\Python\Python312\`
   
2. Add to PATH manually:
   - Press `Win + R`
   - Type `sysdm.cpl` and press Enter
   - Click "Advanced" tab
   - Click "Environment Variables"
   - Under "User variables", select "Path"
   - Click "Edit"
   - Click "New"
   - Add: `C:\Users\YourUsername\AppData\Local\Programs\Python\Python312\`
   - Click "New" again
   - Add: `C:\Users\YourUsername\AppData\Local\Programs\Python\Python312\Scripts\`
   - Click "OK" on all windows
   - Restart PowerShell
   - Try `python --version` again

## Alternative: Python from Microsoft Store

If the official installer doesn't work:

1. Open Microsoft Store
2. Search for "Python 3.12" (or latest version)
3. Click "Get" or "Install"
4. Wait for installation
5. Restart PowerShell
6. Try `python --version`

## Quick Test Commands

After successful installation:

```powershell
# Check Python
python --version

# Check pip
pip --version

# Test Python works
python -c "print('Hello from Python!')"
```

Expected output:
```
Hello from Python!
```

## What to Do After Python is Installed

Once `python --version` works, proceed with backend setup:

```powershell
# Navigate to backend
cd d:\personal\projects\EDA\backend

# Option 1: Automated setup (recommended)
powershell -ExecutionPolicy Bypass -File .\setup-and-test.ps1

# Option 2: Manual setup
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## Need More Help?

### Official Resources:
- Python Downloads: https://www.python.org/downloads/
- Python Windows FAQ: https://docs.python.org/3/faq/windows.html

### Common Issues:
- **"python is not recognized"** → Add to PATH or reinstall
- **"pip is not recognized"** → `python -m pip --version`
- **"Execution policy"** → Run as Administrator or use `-ExecutionPolicy Bypass`

---

**Once Python is installed and verified, let me know and we'll proceed with the backend setup!** 🚀
