'use strict'; // Enforces strict mode for better error checking and improved performance

const express = require('express'); // Import the Express framework
const app = express(); // Create an instance of an Express application

// Endpoint for /math/circle/:r
app.get('/math/circle/:r', (req, res) => {
  // Retrieve the radius from the URL parameter and convert it to a float
  const radius = parseFloat(req.params.r);
  
  // Check if the radius is a valid number and non-negative
  if (isNaN(radius) || radius < 0) {
    // Respond with a 400 Bad Request status and an error message
    return res.type('text').status(400).send('Error, Bad Request: Invalid radius');
  }
  
  // Calculate the area and circumference of the circle
  const area = Math.PI * radius * radius; // Area formula: π * r^2
  const circumference = Math.PI * 2 * radius; // Circumference formula: 2 * π * r
  
  // Send the calculated area and circumference as a JSON response
  res.json({ area: area, circumference: circumference });
});

// Endpoint for /hello/name
app.get('/hello/name', (req, res) => {
  // Retrieve the first and last names from the query parameters
  const { first, last } = req.query;

  // Check if both first and last names are provided
  if (!first && !last) {
    // Respond with a 400 Bad Request status if both parameters are missing
    return res.type('text').status(400).send('Missing Required GET parameters: first, last');
  } else if (!first) {
    // Respond with a 400 Bad Request status if the first name is missing
    return res.type('text').status(400).send('Missing Required GET parameter: first');
  } else if (!last) {
    // Respond with a 400 Bad Request status if the last name is missing
    return res.type('text').status(400).send('Missing Required GET parameter: last');
  }

  // Send a greeting message with the provided first and last names
  res.type('text').send(`Hello ${first} ${last}`);
});

// Set the port for the server to listen on, using environment variable or default to 8000
const PORT = process.env.PORT || 8000;

// Start the server and log a message indicating the port it's running on
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Once you get "Server is running on port 8000" the links below should work
// For the circle area and circumference: http://localhost:8000/math/circle/5 
// (replace 5 with your desired radius).
// For the hello name endpoint: http://localhost:8000/hello/name?first=Brian&last=Hert 
// (replace Brian Hert with your desired names).