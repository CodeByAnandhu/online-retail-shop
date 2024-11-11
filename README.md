# online-retail-shop

This is a web-based Online Retail Shop platform that allows users to browse and purchase products. The application includes features such as order processing, product management, and customer interactions. The backend of the platform is built using Node.js with Express, and MongoDB is used as the database for storing product and order information.

#Table of Contents
Features
Technologies
Installation
Usage
Testing
Contributing

#Features
Product catalog to browse and search for products
Product management (Add, Edit, Delete products)
Order processing system
Customer order tracking
RESTful API for backend operations

#Technologies
Node.js - JavaScript runtime used for building the server-side application.
Express.js - Web framework for Node.js to handle routing and middleware.
MongoDB - NoSQL database for storing products, orders, and user data.
Jest - JavaScript testing framework for running unit and integration tests.
Supertest - HTTP assertion library for testing API endpoints.
dotenv - Environment variable configuration for sensitive data (API keys, DB credentials).

#Installation
To get started with the Online Retail Shop project, follow these steps:

#Clone the repository: git clone https://github.com/CodeByAnandhu/online-retail-shop.git
cd online-retail-shop

Install dependencies:
Make sure you have Node.js installed. Run the following command to install all necessary dependencies:

npm install

Set up environment variables:
Create a .env file in the root directory of the project and define necessary environment variables like MongoDB URI, etc.

#env :
MONGODB_URI=mongodb+srv://anandhuab:qt1HiRJ1DSULgzbc@cluster0.6l9qi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/onlineRetail
PORT=3000

#Usage
Start the server:
After installing dependencies and setting up your .env file, start the server with:

npm start

The server will run on the port defined in your .env file (default: 3000) or 5000.

Access the application:
Open your browser and go to http://localhost:3000 or http://localhost:5000 to view the API or connect with the front-end.

Make API requests:
You can use tools like Postman or Insomnia to make requests to the API. Example API routes:

GET /api/products - Get all products.
POST /api/products - Add a new product.
GET /api/orders - Get all orders.
POST /api/orders - Place an order.

#Testing
To run tests with Jest, use the following command:

npm test

This will execute all the tests defined in the __tests__ folder. If you want to add more tests, simply create new test files and add your test cases.

#GitHub Actions
This repository is configured with GitHub Actions for continuous integration (CI). Every time changes are pushed to the main branch, tests will be automatically run.

Workflow Configuration:
Node.js versions supported: 18, 20
Test command: npm test
The workflow ensures that all tests pass on different Node.js versions.
