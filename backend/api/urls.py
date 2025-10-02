"""
URL configuration for API endpoints
"""
from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('filters/', views.get_filter_options, name='filter_options'),
    path('dashboard/', views.get_dashboard_data, name='dashboard_data'),
    path('sales-by-year/', views.get_sales_by_year, name='sales_by_year'),
    path('volume-by-year/', views.get_volume_by_year, name='volume_by_year'),
    path('monthly-trend/', views.get_monthly_trend, name='monthly_trend'),
    path('market-share/', views.get_market_share, name='market_share'),
    path('summary/', views.get_summary_stats, name='summary_stats'),
]
