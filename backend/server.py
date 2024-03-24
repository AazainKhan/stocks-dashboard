from flask import jsonify
from pyfinviz.news import News
from bs4 import BeautifulSoup
from flask import Flask, make_response, jsonify, request
import yfinance as yf
import pandas as pd
import json
import requests
import api_key
apikey = api_key.API_KEY


app = Flask(__name__)

df = pd.read_html(
    "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies")[0]
df = df[['Symbol', 'Security']]

companies = [{'value': df['Symbol'][x], 'label': df['Security'][x]}
             for x in range(len(df))]


@app.route('/companies')
def companyList():
    return companies, {'Access-Control-Allow-Origin': '*'}


@app.route('/top-gainers')
def top_gainers():
    # insert api key from api.py
    url = f"https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey={apikey}"
    top_gainers = requests.get(url).json()
    gainerInfo = json.dumps(top_gainers)

    response = make_response(gainerInfo)

    return response, {'Access-Control-Allow-Origin': '*'}


@app.route('/top-losers')
def top_losers():
    url = f"https://financialmodelingprep.com/api/v3/stock_market/losers?apikey={apikey}"
    top_losers = requests.get(url).json()
    loserInfo = json.dumps(top_losers)

    response = make_response(loserInfo)

    return response, {'Access-Control-Allow-Origin': '*'}


@app.route('/top-active')
def top_active():
    url = "https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=VNUrWHh03OUNyt5Fc9TnXZE72DKUBHXi"
    top_active = requests.get(url).json()
    activeInfo = json.dumps(top_active)

    response = make_response(activeInfo)

    return response, {'Access-Control-Allow-Origin': '*'}


@app.route('/<ticker>')
def ticker(ticker):
    ticker = yf.Ticker(f"{ticker}")
    tickerInfo = json.dumps(ticker.info)

    response = make_response(tickerInfo)  # convert to json if not already

    # add headers to allow CORS
    return response, {'Access-Control-Allow-Origin': '*'}


@app.route('/historical/<ticker>')
def history(ticker):

    ticker = yf.Ticker(f"{ticker}")

    historical_prices = ticker.history(
        period="max", interval="1d")

    date_index = historical_prices.index
    # convert to unix timestamp in seconds and then to list
    timestamps = (date_index.astype(int)/1000000000).tolist()

    data = [list(x)
            for x in zip(timestamps, historical_prices["Close"].tolist())]
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/news/<ticker>')
def get_news(ticker):
    url = f'https://finviz.com/quote.ashx?t={ticker}'
    headers = {'user-agent': 'news_scraper'}
    response = requests.get(url, headers=headers)

    soup = BeautifulSoup(response.content, 'html.parser')
    finviz_news_table = soup.find(id='news-table')

    news_data = []

    for news_item in finviz_news_table.findAll('tr'):
        datetime_info = news_item.find('td').text.strip()  # Date and time
        headline_info = news_item.a.text.strip()           # Headline
        link_info = news_item.a['href']                    # Link to the news

        news_data.append({
            "datetime": datetime_info,
            "headline": headline_info,
            "link": link_info
        })

    # Return the news data as JSON with CORS headers
    return jsonify(news_data), {'Access-Control-Allow-Origin': '*'}


@app.route('/news')
def get_all_news():
    news = News()
    news_data = news.news_df.to_json(orient='records')
    return jsonify(news_data), {'Access-Control-Allow-Origin': '*'}

if __name__ == '__main__':
    app.run(port=5000, debug=True, use_reloader=True)
