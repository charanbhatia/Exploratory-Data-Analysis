"""
Data Service for loading and processing CSV data
Handles all data operations including filtering and aggregations
"""
import pandas as pd
from django.conf import settings
from functools import lru_cache
import os


class DataService:
    """Service class for handling CSV data operations"""
    
    _instance = None
    _data = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DataService, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if self._data is None:
            self.load_data()
    
    def load_data(self):
        """Load CSV data into pandas DataFrame"""
        try:
            csv_path = settings.DATA_FILE_PATH
            if not os.path.exists(csv_path):
                raise FileNotFoundError(f"Data file not found at: {csv_path}")
            
            self._data = pd.read_csv(csv_path)
            
            # Clean column names (remove trailing spaces and commas)
            self._data.columns = self._data.columns.str.strip().str.rstrip(',')
            
            # Convert date column to datetime
            if 'date' in self._data.columns:
                self._data['date'] = pd.to_datetime(self._data['date'], format='%d-%m-%Y', errors='coerce')
            
            # Ensure numeric columns are properly typed
            numeric_columns = ['SalesValue', 'Volume', 'VolumeUnits', 'Year', 'Month', 'Week']
            for col in numeric_columns:
                if col in self._data.columns:
                    self._data[col] = pd.to_numeric(self._data[col], errors='coerce')
            
            print(f"Data loaded successfully: {len(self._data)} rows")
            
        except Exception as e:
            print(f"Error loading data: {str(e)}")
            raise
    
    def get_data(self):
        """Get the full dataset"""
        return self._data
    
    def get_filter_options(self):
        """Get unique values for all filter fields"""
        if self._data is None:
            return {}
        
        filters = {}
        filter_columns = ['Brand', 'PackType', 'PPG', 'Channel', 'Year']
        
        for col in filter_columns:
            if col in self._data.columns:
                # Get unique values, excluding 'All*' values and NaN
                unique_vals = self._data[col].dropna().unique()
                # Convert to string and remove .0 from numbers
                unique_vals = [str(v).replace('.0', '') if str(v).endswith('.0') else str(v) 
                              for v in unique_vals if not str(v).startswith('All')]
                filters[col] = sorted(unique_vals)
        
        return filters
    
    def apply_filters(self, filters):
        """Apply filters to the dataset"""
        df = self._data.copy()
        
        if not filters:
            return df
        
        for key, value in filters.items():
            if value and key in df.columns:
                # Handle multiple values (array)
                if isinstance(value, list) and len(value) > 0:
                    # Convert filter values to match data type
                    if key == 'Year':
                        # Convert year strings to numeric for comparison
                        filter_values = [float(v.replace('.0', '')) if isinstance(v, str) else float(v) for v in value]
                        df = df[df[key].isin(filter_values)]
                    else:
                        df = df[df[key].isin(value)]
                elif not isinstance(value, list) and value:
                    if key == 'Year':
                        filter_value = float(value.replace('.0', '')) if isinstance(value, str) else float(value)
                        df = df[df[key] == filter_value]
                    else:
                        df = df[df[key] == value]
        
        return df
    
    def get_sales_by_year(self, filters=None):
        """Get sales value aggregated by year"""
        df = self.apply_filters(filters)
        
        if 'Year' not in df.columns or 'SalesValue' not in df.columns:
            return []
        
        result = df.groupby('Year')['SalesValue'].sum().reset_index()
        result = result.sort_values('Year')
        
        return [
            {'year': int(row['Year']), 'value': float(row['SalesValue'])}
            for _, row in result.iterrows()
        ]
    
    def get_volume_by_year(self, filters=None):
        """Get volume aggregated by year"""
        df = self.apply_filters(filters)
        
        if 'Year' not in df.columns or 'Volume' not in df.columns:
            return []
        
        result = df.groupby('Year')['Volume'].sum().reset_index()
        result = result.sort_values('Year')
        
        return [
            {'year': int(row['Year']), 'value': float(row['Volume'])}
            for _, row in result.iterrows()
        ]
    
    def get_monthly_trend(self, filters=None):
        """Get monthly sales trend"""
        df = self.apply_filters(filters)
        
        if 'Year' not in df.columns or 'Month' not in df.columns or 'SalesValue' not in df.columns:
            return []
        
        result = df.groupby(['Year', 'Month'])['SalesValue'].sum().reset_index()
        result = result.sort_values(['Year', 'Month'])
        
        # Create a month label
        result['month_label'] = result.apply(
            lambda row: f"{int(row['Year'])}-{int(row['Month']):02d}", axis=1
        )
        
        return [
            {
                'month': row['month_label'],
                'year': int(row['Year']),
                'month_num': int(row['Month']),
                'value': float(row['SalesValue'])
            }
            for _, row in result.iterrows()
        ]
    
    def get_market_share_by_sales(self, filters=None):
        """Get market share by sales value"""
        df = self.apply_filters(filters)
        
        if 'Brand' not in df.columns or 'SalesValue' not in df.columns:
            return []
        
        result = df.groupby('Brand')['SalesValue'].sum().reset_index()
        result = result.sort_values('SalesValue', ascending=False)
        
        total_sales = result['SalesValue'].sum()
        
        return [
            {
                'brand': row['Brand'],
                'value': float(row['SalesValue']),
                'percentage': float((row['SalesValue'] / total_sales * 100)) if total_sales > 0 else 0
            }
            for _, row in result.iterrows()
            if not str(row['Brand']).startswith('All')
        ]
    
    def get_market_share_by_volume(self, filters=None):
        """Get market share by volume"""
        df = self.apply_filters(filters)
        
        if 'Brand' not in df.columns or 'Volume' not in df.columns:
            return []
        
        result = df.groupby('Brand')['Volume'].sum().reset_index()
        result = result.sort_values('Volume', ascending=False)
        
        total_volume = result['Volume'].sum()
        
        return [
            {
                'brand': row['Brand'],
                'value': float(row['Volume']),
                'percentage': float((row['Volume'] / total_volume * 100)) if total_volume > 0 else 0
            }
            for _, row in result.iterrows()
            if not str(row['Brand']).startswith('All')
        ]
    
    def get_summary_stats(self, filters=None):
        """Get summary statistics"""
        df = self.apply_filters(filters)
        
        stats = {
            'total_sales': float(df['SalesValue'].sum()) if 'SalesValue' in df.columns else 0,
            'total_volume': float(df['Volume'].sum()) if 'Volume' in df.columns else 0,
            'total_records': len(df),
            'avg_sales': float(df['SalesValue'].mean()) if 'SalesValue' in df.columns else 0,
            'avg_volume': float(df['Volume'].mean()) if 'Volume' in df.columns else 0,
        }
        
        return stats
    
    def get_sales_by_channel(self, filters=None):
        """Get sales by channel"""
        df = self.apply_filters(filters)
        
        if 'Channel' not in df.columns or 'SalesValue' not in df.columns:
            return []
        
        result = df.groupby('Channel')['SalesValue'].sum().reset_index()
        result = result.sort_values('SalesValue', ascending=False)
        
        return [
            {
                'channel': row['Channel'],
                'value': float(row['SalesValue'])
            }
            for _, row in result.iterrows()
            if not str(row['Channel']).startswith('All')
        ]
    
    def get_sales_by_pack_type(self, filters=None):
        """Get sales by pack type"""
        df = self.apply_filters(filters)
        
        if 'PackType' not in df.columns or 'SalesValue' not in df.columns:
            return []
        
        result = df.groupby('PackType')['SalesValue'].sum().reset_index()
        result = result.sort_values('SalesValue', ascending=False)
        
        return [
            {
                'pack_type': row['PackType'],
                'value': float(row['SalesValue'])
            }
            for _, row in result.iterrows()
            if not str(row['PackType']).startswith('All')
        ]


# Singleton instance
data_service = DataService()
