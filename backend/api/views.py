"""
API Views for EDA Dashboard
Handles all API endpoints for data retrieval and analysis
"""
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .data_service import data_service


@api_view(['GET'])
def health_check(request):
    """Health check endpoint"""
    return Response({
        'status': 'ok',
        'message': 'EDA API is running'
    })


@api_view(['GET'])
def get_filter_options(request):
    """Get all available filter options"""
    try:
        filters = data_service.get_filter_options()
        return Response({
            'success': True,
            'data': filters
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def get_dashboard_data(request):
    """Get all dashboard data based on filters"""
    try:
        filters = request.data.get('filters', {})
        
        # Get all required data
        data = {
            'sales_by_year': data_service.get_sales_by_year(filters),
            'volume_by_year': data_service.get_volume_by_year(filters),
            'monthly_trend': data_service.get_monthly_trend(filters),
            'market_share_sales': data_service.get_market_share_by_sales(filters),
            'market_share_volume': data_service.get_market_share_by_volume(filters),
            'summary_stats': data_service.get_summary_stats(filters),
            'sales_by_channel': data_service.get_sales_by_channel(filters),
            'sales_by_pack_type': data_service.get_sales_by_pack_type(filters),
        }
        
        return Response({
            'success': True,
            'data': data
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def get_sales_by_year(request):
    """Get sales value by year"""
    try:
        filters = request.data.get('filters', {})
        data = data_service.get_sales_by_year(filters)
        
        return Response({
            'success': True,
            'data': data
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def get_volume_by_year(request):
    """Get volume by year"""
    try:
        filters = request.data.get('filters', {})
        data = data_service.get_volume_by_year(filters)
        
        return Response({
            'success': True,
            'data': data
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def get_monthly_trend(request):
    """Get monthly sales trend"""
    try:
        filters = request.data.get('filters', {})
        data = data_service.get_monthly_trend(filters)
        
        return Response({
            'success': True,
            'data': data
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def get_market_share(request):
    """Get market share data"""
    try:
        filters = request.data.get('filters', {})
        metric = request.data.get('metric', 'sales')  # 'sales' or 'volume'
        
        if metric == 'volume':
            data = data_service.get_market_share_by_volume(filters)
        else:
            data = data_service.get_market_share_by_sales(filters)
        
        return Response({
            'success': True,
            'data': data
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def get_summary_stats(request):
    """Get summary statistics"""
    try:
        filters = request.data.get('filters', {})
        data = data_service.get_summary_stats(filters)
        
        return Response({
            'success': True,
            'data': data
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
