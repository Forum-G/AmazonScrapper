# Amazon Scraper API

## Description

Amazon Scraper API is a Node.js application that provides easy access to product data, prices, sales, and reviews from Amazon.com. It allows users to retrieve this data in a convenient JSON format.

## Features

- Data Scraping: The API utilizes web scraping techniques to extract information from Amazon.com, including product details, prices, ratings, and reviews.
- Express Framework: The application is built using the Express framework, which provides a robust and efficient web server for handling API requests.
- Request-Promise Library: The request-promise library is used to simplify HTTP requests and handle asynchronous operations when fetching data from Amazon.com.
- API Endpoints: The API offers three endpoints for retrieving different types of data related to a specific product on Amazon.com:
  - `/products/:productId` - Returns the title, price, rating, and rating bar chart for a given product ID.
  - `/products/:productId/reviews` - Returns a list of reviews and an average rating line chart for a given product ID.
  - `/products/:productId/offers/chart` - Returns a price distribution chart for offers of a given product ID.
- Scraper API Key: The application requires a Scraper API Key to access Amazon.com and retrieve the desired data.
- JSON Response: The API responds to HTTP GET requests with JSON-formatted data, making it easy to integrate with other applications.
- Error Handling: The application handles errors gracefully and returns error responses in JSON format.

Explain how to use the Amazon Scraper API once it is installed. Provide examples and instructions on how to make HTTP GET requests to the different endpoints and retrieve the desired data. Include information on how to pass the Scraper API Key for authentication purposes.

## Technologies Used

- [Node.js](https://nodejs.org/) - A JavaScript runtime environment for building server-side applications.
- [Express](https://expressjs.com/) - A fast, unopinionated, and minimalist web framework for Node.js.
- [request-promise](https://www.npmjs.com/package/request-promise) - A simplified HTTP request library for Node.js, used for making HTTP requests to Amazon.com.
- [Scraper API](https://www.scraperapi.com/) - A web scraping API service used to access Amazon.com and retrieve the required data.

