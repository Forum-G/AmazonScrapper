const express = require("express");
const request = require("request-promise");
const { JSDOM } = require("jsdom");

// Create express server
const app = express();
const PORT = process.env.PORT || 5002;

// Scraper API Key
const generateScraperUrl = (apiKey) =>
  `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

  console.log(generateScraperUrl());

app.use(express.json());

// GET Home Route
app.get("/", (req, res) => {
  res.send("Welcome to my Amazon Scraper API");
});

// GET Product Details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`
    );

    // Parse product data
    const productData = JSON.parse(response);

    // Extract relevant data for visualization
    const { title, price, rating } = productData.data;

    // Generate a bar chart of the product rating
    const chartUrl = `https://quickchart.io/chart?c={type:'bar',data:{labels:['Rating'],datasets:[{label:'${title}',data:[${rating}]}]}}`;

    res.json({
      title,
      price,
      rating,
      chartUrl
    });
  } catch (error) {
    res.json(error);
  }
});

// GET Product Reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  const { page } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        apiKey
      )}&url=https://www.amazon.com/product-reviews/${productId}/ref=cm_cr_arp_d_paging_btm_next_2?pageNumber=${page}`
    );

    // Parse review data
    const reviewData = JSON.parse(response);

    // Extract relevant data for visualization
    const reviews = reviewData.data.map((review) => ({
      rating: review.rating,
      date: review.date
    }));

    // Group reviews by date
    const groupedReviews = {};
    reviews.forEach((review) => {
      const date = review.date.split(" ")[0];
      if (!groupedReviews[date]) {
        groupedReviews[date] = {
          totalRatings: 0,
          totalScore: 0
        };
      }
      groupedReviews[date].totalRatings++;
      groupedReviews[date].totalScore += review.rating;
    });

    // Generate a line chart of the average rating over time
    const chartData = {
      labels: Object.keys(groupedReviews),
      datasets: [
        {
          label: "Average Rating",
          data: Object.values(groupedReviews).map(
            (group) => group.totalScore / group.totalRatings
          ),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1
        }
      ]
    };
    const chartUrl = `https://quickchart.io/chart?c={type:'line',data:${JSON.stringify(
      chartData
    )}}`;

    res.json({
      reviews,
      chartUrl
    });
  } catch (error) {
    res.json(error);
  }
});

// GET Product Offers as a Chart
app.get("/products/:productId/offers/chart", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        apiKey
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}/ref=olp_f_primeEligible?ie=UTF8&f_primeEligible=true`
    );
    const data = JSON.parse(response);

    // Extract offer prices from the response data
    const prices = data.data.map((offer) => parseFloat(offer.price.replace('$', '')));

    // Calculate the distribution of prices
    const distribution = prices.reduce((acc, price) => {
      const bucket = Math.floor(price / 10) * 10;
      acc[bucket] = (acc[bucket] || 0) + 1;
      return acc;
    }, {});

    // Convert the distribution object to an array of key-value pairs
    const chartData = Object.entries(distribution).map(([price, count]) => ({
      price,
      count,
    }));

    res.json(chartData);
  } catch (error) {
    res.json(error);
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
