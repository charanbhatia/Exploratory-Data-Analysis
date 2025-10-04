import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B9D'];

const Dashboard = ({ data }) => {
  if (!data) {
    return <div className="dashboard">No data available</div>;
  }

  const {
    summary_stats,
    sales_by_year,
    volume_by_year,
    monthly_trend,
    market_share_sales,
    market_share_volume
  } = data;

  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2
    }).format(num);
  };

  // Format currency
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="dashboard">
      {/* Summary Statistics */}
      <div className="summary-section" id="summary">
        <h2>📈 Summary Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Sales</h3>
            <p className="stat-value">{formatCurrency(summary_stats.total_sales)}</p>
          </div>
          <div className="stat-card">
            <h3>Total Volume</h3>
            <p className="stat-value">{formatNumber(summary_stats.total_volume)} kg</p>
          </div>
          <div className="stat-card">
            <h3>Average Sales</h3>
            <p className="stat-value">{formatCurrency(summary_stats.avg_sales)}</p>
          </div>
          <div className="stat-card">
            <h3>Total Records</h3>
            <p className="stat-value">{formatNumber(summary_stats.total_records)}</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-section" id="charts">
        {/* Sales by Year - Horizontal Bar Chart */}
        <div className="chart-container">
          <h3>Sales Value by Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sales_by_year} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={formatCurrency} />
              <YAxis dataKey="year" type="category" />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Sales Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Volume by Year - Horizontal Bar Chart */}
        <div className="chart-container">
          <h3>Volume (kg) by Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volume_by_year} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="year" type="category" />
              <Tooltip formatter={(value) => `${formatNumber(value)} kg`} />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" name="Volume (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Year-wise Sales - Vertical Bar Chart */}
        <div className="chart-container">
          <h3>Year-wise Sales Value</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sales_by_year}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="value" fill="#0088FE" name="Sales Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend - Line Chart */}
        <div className="chart-container chart-wide">
          <h3>Monthly Trend of Sales Value</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthly_trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#FF8042" strokeWidth={2} name="Sales Value" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Market Share by Sales - Pie Chart */}
        <div className="chart-container">
          <h3>Market Share by Sales</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={market_share_sales}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ brand, percentage }) => `${brand}: ${percentage.toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="brand"
              >
                {market_share_sales.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Market Share by Volume - Donut Chart */}
        <div className="chart-container">
          <h3>Market Share by Volume</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={market_share_volume}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ brand, percentage }) => `${brand}: ${percentage.toFixed(1)}%`}
                outerRadius={100}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
                nameKey="brand"
              >
                {market_share_volume.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${formatNumber(value)} kg`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
