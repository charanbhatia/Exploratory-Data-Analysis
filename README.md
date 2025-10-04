# Exploratory Data Analysis (EDA) Application

A full-stack web application for interactive data exploration and visualization of technical evaluation data.

## Live Demo

- **Frontend**: [https://exploratory-data-analysis-mu.vercel.app](https://exploratory-data-analysis-mu.vercel.app)
- **Backend API**: [https://exploratory-data-analysis-g1rn.onrender.com](https://exploratory-data-analysis-g1rn.onrender.com)

## Features

### Data Filtering
- 5 Dynamic Filters: Brand, Pack Type, PPG (Price Per Gram), Channel, Year
- Real-time data filtering and updates
- Multi-select capability for comprehensive analysis

### Interactive Visualizations
1. Sales by Brand - Horizontal Bar Chart
2. Volume by Brand - Horizontal Bar Chart
3. Year-wise Sales Trend - Vertical Bar Chart
4. Monthly Sales Trend - Line Chart
5. Market Share by Brand - Pie Chart
6. Volume Distribution - Donut Chart

### Modern UI/UX
- Dark theme with glass morphism effects
- Smooth animations and transitions
- Fully responsive design (mobile, tablet, desktop)
- Professional header with navigation
- Comprehensive footer

## Tech Stack

### Frontend
- React 18 - Modern UI library
- Recharts - Data visualization library
- Axios - HTTP client
- CSS3 - Animations and styling
- Vercel - Deployment platform

### Backend
- Django 4.2.7 - Web framework
- Django REST Framework 3.14.0 - API framework
- Pandas 2.1.3 - Data processing
- NumPy 1.26.2 - Numerical computing
- Gunicorn - WSGI HTTP server
- Whitenoise - Static file serving
- Render - Deployment platform

## Dataset

- 10,244 records of technical evaluation data
- Includes sales, volume, pricing, and distribution metrics
- Date range: Multiple years of historical data
- Fields: Brand, Pack Type, PPG, Channel, Date, Sales, Volume

## Project Structure

```
EDA/
├── backend/
│   ├── api/                    # Django REST API
│   ├── eda_project/            # Django project settings
│   ├── Technical Evaluation.csv
│   ├── build.sh
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/         # React components
    │   └── services/           # API client
    ├── package.json
    └── vercel.json
```

## API Endpoints

**Base URL**: `https://exploratory-data-analysis-g1rn.onrender.com/api`

- `GET /api/filters/` - Get available filter options
- `POST /api/dashboard/` - Get dashboard data with filters

## Local Development

### Prerequisites
- Python 3.12+
- Node.js 18+

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Deployment

### Backend (Render)
- Root directory: `backend`
- Build: `chmod +x build.sh && ./build.sh`
- Start: `gunicorn eda_project.wsgi:application`

### Frontend (Vercel)
- Root directory: `frontend`
- Framework: Create React App
- Build: `npm run build`

## Author

Charan Bhatia - [GitHub](https://github.com/charanbhatia)

## License

MIT License - Open source project

---

Built using React and Django
