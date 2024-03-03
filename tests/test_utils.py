# test_utils.py in the tests/ directory
from backend.app.utils import fetch_stock_data
import pandas as pd

def test_fetch_stock_data():
    """Test fetching stock data from Yahoo Finance works correctly."""
    ticker = 'AAPL'
    start_date = '2020-01-01'
    end_date = '2020-01-10'
    data = fetch_stock_data(ticker, start_date, end_date)
    
    assert isinstance(data, pd.DataFrame)
    assert not data.empty
    expected_columns = ['Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume']
    assert all(column in data.columns for column in expected_columns)
