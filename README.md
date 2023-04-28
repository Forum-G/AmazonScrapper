# Amazon Scrapper API

Amazon Data Scrapper is the easiest way to access to products, prices, sales and review data from amazon in JSON format.

This is a Node.js application that uses the Express framework and the request-promise library to create a web API that scrapes data from Amazon.com. 

The API has three endpoints that allow the user to retrieve different kinds of data related to a specific product on Amazon.com:

/products/:productId - This endpoint returns the title, price, rating, and a bar chart of the rating for a given product ID on Amazon.com.

/products/:productId/reviews - This endpoint returns a list of reviews for a given product ID on Amazon.com, along with a line chart of the average rating over time.

/products/:productId/offers/chart - This endpoint returns a distribution of prices for offers of a given product ID on Amazon.com in the form of a chart.

The application uses the Scraper API Key to access the Amazon.com website and retrieve the required data. 

The API endpoints are accessed through HTTP GET requests, and the response is returned in JSON format. 

The application also handles errors and returns them in JSON format. 

