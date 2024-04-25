# SQL-Library-Manager 

This application was created for a fictional local library to help them manage their collection of books. This web application will include pages to list, add, update, and delete books. I used JavaScript, Node.js, Express, Pug, SQLite and the SQL ORM Sequelize to build this application. 

Implemented the following: 

-Created a Book model using sequelize-cli. 
-Add the following settings to the title and author properties:
Set the allowNull property to false
Add Sequelize validation and appropriate error messages to ensure the values cannot be empty when creating or updating a book in the database
-Sync the Model and Connect to the Database
-Error handling; created a 404 status error and global error handler with user-friendly message and rendered the appropriate templates. 
-Set up Routes: Home, Book, New Book, Create Book, Book detail, Update Book, and Delete Book routes.
-Set up views; Converted given HTML files into pug files
-Required Fields and Forms; if title and author are empty upon form submission a user-friendly message will notify the user. Utilized Sequelize model validation for validating your form fields. When form fields are clicked added focus state. 




