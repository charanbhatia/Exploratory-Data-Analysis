# EDA Dashboard Application

A comprehensive Exploratory Data Analysis (EDA) dashboard built with React (frontend) and Django (backend) for analyzing FMCG retail sales data.

## 🎯 Features

- **Interactive Filters**: Brand, Pack Type, PPG, Channel, Year
- **Multiple Visualizations**:
  - Horizontal bar charts for Sales Value and Volume by Year
  - Vertical bar chart for Year-wise Sales Value
  - Line chart for Monthly Sales Trend
  - Pie/Donut charts for Market Share (Sales & Volume)
- **Real-time Data Analysis**: Dynamic filtering and aggregation
- **Responsive Design**: Clean, user-friendly interface
- **RESTful API**: Well-structured Django REST Framework backend

## 🏗️ Architecture

### Backend (Django)
- **Framework**: Django 4.2.7 with Django REST Framework
- **Data Processing**: Pandas for efficient CSV data handling
- **API Design**: RESTful endpoints with comprehensive filtering
- **CORS**: Configured for frontend-backend communication

### Frontend (React)
- **Framework**: React 18 with modern hooks
- **Charts**: Recharts/Chart.js for data visualization
- **State Management**: React Context API or Redux
- **Styling**: CSS Modules with responsive design
- **API Integration**: Axios for HTTP requests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software:
1. **Python 3.9 or higher**
   - Download from: https://www.python.org/downloads/
   - ⚠️ **IMPORTANT**: During installation, check "Add Python to PATH"
   
2. **Node.js 16 or higher** (for React frontend)
   - Download from: https://nodejs.org/
   - This includes npm (Node Package Manager)

3. **Git** (for version control)
   - Download from: https://git-scm.com/downloads

### Verify Installations:
```bash
# Check Python
python --version

# Check Node.js
node --version

# Check npm
npm --version

# Check Git
git --version
```

## 🚀 Installation & Setup

### Step 1: Install Python (if not installed)

1. Download Python from https://www.python.org/downloads/
2. Run the installer
3. ✅ **CHECK "Add Python to PATH"** (very important!)
4. Click "Install Now"
5. After installation, **restart your terminal/PowerShell**
6. Verify: `python --version`

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional, for admin access)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

Backend will run on: **http://localhost:8000**

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will run on: **http://localhost:3000**

## 🧪 Testing the Backend

### Test 1: Health Check
```bash
# In a new terminal
curl http://localhost:8000/api/health/
```
Expected response: `{"status":"ok","message":"EDA API is running"}`

### Test 2: Get Filter Options
```bash
curl http://localhost:8000/api/filters/
```

### Test 3: Get Dashboard Data (using PowerShell)
```powershell
$body = @{
    filters = @{}
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/dashboard/" -Method Post -Body $body -ContentType "application/json"
```

### Test 4: Get Dashboard Data (using curl)
```bash
curl -X POST http://localhost:8000/api/dashboard/ \
  -H "Content-Type: application/json" \
  -d "{\"filters\":{}}"
```

## 📁 Project Structure

```
EDA/
├── backend/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── data_service.py      # Data processing logic
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py               # API endpoints
│   │   └── views.py              # API views
│   ├── eda_project/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py           # Django configuration
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .gitignore
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── services/            # API services
│   │   ├── utils/               # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
├── Technical Evaluation.csv      # Dataset
└── README.md
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health/` | GET | Health check |
| `/api/filters/` | GET | Get filter options |
| `/api/dashboard/` | POST | Get all dashboard data |
| `/api/sales-by-year/` | POST | Get sales by year |
| `/api/volume-by-year/` | POST | Get volume by year |
| `/api/monthly-trend/` | POST | Get monthly trend |
| `/api/market-share/` | POST | Get market share |
| `/api/summary/` | POST | Get summary statistics |

### Example API Request:
```json
POST /api/dashboard/
{
  "filters": {
    "Brand": ["Brand 1", "Brand 2"],
    "Year": [2021, 2022],
    "Channel": ["Convenience"]
  }
}
```

## 🎨 Dashboard Features

### 1. Filter Panel
- Multi-select filters for all dimensions
- Real-time data updates
- Clear/Reset functionality

### 2. Summary Statistics
- Total Sales Value
- Total Volume
- Average Sales
- Total Records

### 3. Charts
- **Sales by Year**: Horizontal bar chart
- **Volume by Year**: Horizontal bar chart
- **Year-wise Sales**: Vertical bar chart
- **Monthly Trend**: Line chart with time series
- **Market Share**: Pie/Donut charts with legends

## 🔧 Configuration

### Backend Configuration (`backend/eda_project/settings.py`)
- Database: SQLite (development)
- CORS: Configured for localhost:3000
- Data file path: Automatically configured

### Frontend Configuration
- API Base URL: `http://localhost:8000/api`
- Chart colors: Customizable in theme configuration

## 📊 Data Processing

The application processes CSV data with:
- Automatic data type conversion
- Date parsing and formatting
- Aggregation by multiple dimensions
- Filtering with multiple criteria
- Efficient caching for performance

## 🚨 Troubleshooting

### Python not found
- Reinstall Python and check "Add to PATH"
- Restart terminal after installation
- Use `python` or `python3` depending on your system

### Port already in use
```bash
# Backend (port 8000)
python manage.py runserver 8001

# Frontend (port 3000)
PORT=3001 npm start  # macOS/Linux
set PORT=3001 && npm start  # Windows
```

### CORS errors
- Ensure backend is running
- Check CORS settings in `settings.py`
- Verify frontend is using correct API URL

### Data not loading
- Verify `Technical Evaluation.csv` exists in root directory
- Check file permissions
- Review backend console for errors

## 🔐 Security Notes

- Change `SECRET_KEY` in production
- Set `DEBUG = False` in production
- Configure proper CORS settings
- Use environment variables for sensitive data

## 📝 Git Workflow

```bash
# Initialize repository
git init

# Add files
git add .

# Commit changes
git commit -m "Initial commit: Django backend setup"

# Add remote repository
git remote add origin <your-repo-url>

# Push to GitHub
git push -u origin main
```

## 🎯 Next Steps

1. ✅ Backend setup and testing
2. ⏳ React frontend development
3. ⏳ Chart component integration
4. ⏳ Responsive design implementation
5. ⏳ Performance optimization
6. ⏳ Deployment configuration

## 👥 Development Team

Built with attention to:
- Clean, scalable code architecture
- User experience and design
- Performance optimization
- Best practices and patterns

## 📄 License

This project is developed for technical evaluation purposes.

## 📞 Support

For questions or issues, please refer to the documentation or create an issue in the repository.

---

**Note**: This README will be updated as the project progresses through frontend development and deployment phases.
