import React, { useState, useEffect } from 'react';
import { edaService } from './services/api';
import Dashboard from './components/Dashboard';
import FilterPanel from './components/FilterPanel';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [filterOptions, setFilterOptions] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch filter options on component mount
  useEffect(() => {
    fetchFilterOptions();
  }, []);

  // Fetch dashboard data whenever filters change
  useEffect(() => {
    // Only fetch if we have filter options AND at least one filter is selected
    const hasFilters = Object.keys(selectedFilters).some(
      key => selectedFilters[key] && selectedFilters[key].length > 0
    );
    
    if (Object.keys(filterOptions).length > 0 && hasFilters) {
      fetchDashboardData();
    } else if (Object.keys(filterOptions).length > 0 && !hasFilters) {
      // Clear dashboard if no filters selected
      setDashboardData(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, filterOptions]);

  const fetchFilterOptions = async () => {
    try {
      const response = await edaService.getFilterOptions();
      if (response.success) {
        setFilterOptions(response.data);
      }
    } catch (err) {
      setError('Failed to load filter options. Make sure the backend server is running on http://localhost:8000');
      console.error(err);
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await edaService.getDashboardData(selectedFilters);
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, values) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  return (
    <div className="App">
      <Header />

      <main className="main-content" id="dashboard">
        <div className="page-title">
          <h2>Analytics Dashboard</h2>
          <p>Explore FMCG retail sales data with interactive filters and visualizations</p>
        </div>

        <div id="filters">
          <FilterPanel
            filterOptions={filterOptions}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <p className="error-text">{error}</p>
            <button className="retry-button" onClick={fetchDashboardData}>Retry</button>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading dashboard data...</p>
          </div>
        ) : dashboardData ? (
          <Dashboard data={dashboardData} />
        ) : (
          !error && (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <h3>Welcome to EDA Dashboard</h3>
              <p>Select filters above to start analyzing your data</p>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
