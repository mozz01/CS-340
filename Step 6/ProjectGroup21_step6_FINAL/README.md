## Bookstore Sales Tracker
The purpose of this project is to create an online sales tracker system for BooksRus, a bookstore chain, to enhance their sales tracking capabilities and improve inventory management. The system aims to efficiently record invoices, capturing details of books purchased by customers across the chain’s multiple stores located throughout the United States. Additionally, the system’s database schema is designed to accommodate scenarios involving multiple authors per book, multiple purchases of a single book, and the association of purchases with specific customers and stores. The collected and stored data will enable the business to conduct various analytics in the future to gain valuable insights that can help the business grow.
## Technologies used
This project is implemented using Node.js, Express.js, MySQL, JavaScript, CSS, HTML, and Handlebars.
Node.js: Used to create server-side logic to handle HTTP requests and responses
Express.js: Utilized to define routes and middleware to structure the application.
MySQL: RDBMS used as the backend database to store all information about the book store in a structured table with rows and columns.
JavaScript: Used for both server-side and client-side operations. On the server-side, it is used to handle database operations, and serve dynamic content. On the client side it is used to enhance user interactions, perform validations and update the UI dynamically.
HTML: Used to structure the content (including forms for inputting data and tables for displaying information) and layout of the webpages.
Handlebars: Templating engine used to generate dynamic HTML content, such as displaying the data from the database.
CSS: Used to style and visually enhance the web application for an engaging and user-friendly interface.
Overall, each of these technologies plays an important role in the functionality of the web application to provide CRUD (Create, Read, Update, Delete) functionalities for managing books, authors, invoices, stores, and customers.
Features
Books Management
Insert new books with details such as title, authors, year of publication, and price.
Update existing book details.
Delete books from the database.
Author Management
View existing authors.
Add new authors.
Delete authors from the database.
Invoices Management
Create invoices by selecting a customer, store, and book.
View existing invoices.
Delete invoices.
Stores Management
Add a new store with details such as store name, phone number, and address.
Delete stores from the database.
View existing stores.
Customer Management
Add new customers with details such as their name, email, and phone number.
Delete customers from the database.
View existing customers.

 Citations
Citation for Setup, Route, and HTML codes used in the application:
Based on CS340 nodejs-starter-app on GitHub
Setup codes were taken from the starter app on GitHub. Similarly, the routes for dynamically displaying data, adding/updating/deleting data were also based on various sections of the starter app file in Github. Codes to control the flow of execution of queries based on certain conditions were our own work. Similarly, the SQL queries were our own work.
Source URLs:
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
 
Authors
Mo Hudeihed and Saurav Shrestha
