from flask import Flask, make_response, jsonify
import yfinance as yf
import pandas as pd
import json
import requests

app = Flask(__name__)

df = pd.read_html(
    "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies")[0]
df = df[['Symbol', 'Security']]

companies = [{'value': df['Symbol'][x], 'label': df['Security'][x]}
             for x in range(len(df))]


@app.route('/companies')
def companyList():
    return companies, {'Access-Control-Allow-Origin': '*'}


# @app.route('/top-gainers')
# def top_gainers():
#     url = "https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=VNUrWHh03OUNyt5Fc9TnXZE72DKUBHXi"
#     top_gainers = requests.get(url).json()
#     gainerInfo = json.dumps(top_gainers)

#     response = make_response(gainerInfo)

#     return response, {'Access-Control-Allow-Origin': '*'}


# @app.route('/top-losers')
# def top_losers():
#     url = "https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=VNUrWHh03OUNyt5Fc9TnXZE72DKUBHXi"
#     top_losers = requests.get(url).json()
#     loserInfo = json.dumps(top_losers)

#     response = make_response(loserInfo)

#     return response, {'Access-Control-Allow-Origin': '*'}


# @app.route('/top-active')
# def top_active():
#     url = "https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=VNUrWHh03OUNyt5Fc9TnXZE72DKUBHXi"
#     top_active = requests.get(url).json()
#     activeInfo = json.dumps(top_active)

#     response = make_response(activeInfo)

#     return response, {'Access-Control-Allow-Origin': '*'}


@app.route('/<ticker>')
def ticker(ticker):
    ticker = yf.Ticker(f"{ticker}")
    tickerInfo = json.dumps(ticker.info)

    response = make_response(tickerInfo)  # convert to json if not already

    # add headers to allow CORS
    return response, {'Access-Control-Allow-Origin': '*'}


from flask import jsonify

@app.route('/historical/<ticker>')
def history(ticker):

    ticker = yf.Ticker(f"{ticker}")

    historical_prices = ticker.history(
        period="max", interval="1d")

    date_index = historical_prices.index
    # convert to unix timestamp in seconds and then to list
    timestamps = (date_index.astype(int)/1000000000).tolist()

    data = [list(x) for x in zip(timestamps, historical_prices["Close"].tolist())]
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == '__main__':
    app.run(port=5000, debug=True, use_reloader=True)
