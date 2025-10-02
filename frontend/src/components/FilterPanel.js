import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({ filterOptions, selectedFilters, onFilterChange, onClearFilters }) => {
  const handleChange = (filterType, event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    onFilterChange(filterType, selectedValues.length > 0 ? selectedValues : null);
  };

  const hasFilters = Object.values(selectedFilters).some(val => val && val.length > 0);

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>🔍 Filters</h2>
        {hasFilters && (
          <button className="clear-btn" onClick={onClearFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className="filters-container">
        {/* Brand Filter */}
        {filterOptions.Brand && (
          <div className="filter-group">
            <label>Brand</label>
            <select
              multiple
              value={selectedFilters.Brand || []}
              onChange={(e) => handleChange('Brand', e)}
              className="filter-select"
            >
              {filterOptions.Brand.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <small>{selectedFilters.Brand?.length || 0} selected</small>
          </div>
        )}

        {/* Pack Type Filter */}
        {filterOptions.PackType && (
          <div className="filter-group">
            <label>Pack Type</label>
            <select
              multiple
              value={selectedFilters.PackType || []}
              onChange={(e) => handleChange('PackType', e)}
              className="filter-select"
            >
              {filterOptions.PackType.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <small>{selectedFilters.PackType?.length || 0} selected</small>
          </div>
        )}

        {/* PPG Filter */}
        {filterOptions.PPG && (
          <div className="filter-group">
            <label>PPG</label>
            <select
              multiple
              value={selectedFilters.PPG || []}
              onChange={(e) => handleChange('PPG', e)}
              className="filter-select"
            >
              {filterOptions.PPG.map(ppg => (
                <option key={ppg} value={ppg}>
                  {ppg}
                </option>
              ))}
            </select>
            <small>{selectedFilters.PPG?.length || 0} selected</small>
          </div>
        )}

        {/* Channel Filter */}
        {filterOptions.Channel && (
          <div className="filter-group">
            <label>Channel</label>
            <select
              multiple
              value={selectedFilters.Channel || []}
              onChange={(e) => handleChange('Channel', e)}
              className="filter-select"
            >
              {filterOptions.Channel.map(channel => (
                <option key={channel} value={channel}>
                  {channel}
                </option>
              ))}
            </select>
            <small>{selectedFilters.Channel?.length || 0} selected</small>
          </div>
        )}

        {/* Year Filter */}
        {filterOptions.Year && (
          <div className="filter-group">
            <label>Year</label>
            <select
              multiple
              value={selectedFilters.Year || []}
              onChange={(e) => handleChange('Year', e)}
              className="filter-select"
            >
              {filterOptions.Year.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <small>{selectedFilters.Year?.length || 0} selected</small>
          </div>
        )}
      </div>

      <div className="filter-note">
        <small>💡 Hold Ctrl/Cmd to select multiple options</small>
      </div>
    </div>
  );
};

export default FilterPanel;
