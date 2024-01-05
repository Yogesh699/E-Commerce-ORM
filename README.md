# E-Commerce-ORM

![image](https://github.com/Yogesh699/E-Commerce-ORM/assets/143371945/d50d48f3-8dd3-44a9-84cf-f71c5719acae)

## Overview

This project involves building the back end for an e-commerce site using Express.js as the server framework, Sequelize as the ORM (Object-Relational Mapping) tool, and MySQL as the database. The goal is to create a robust and scalable back end that supports various functionalities required for an e-commerce platform.

## Technologies Used

- **Express.js:** A minimal and flexible Node.js web application framework.
- **Sequelize:** A promise-based Node.js ORM for MySQL, PostgreSQL, SQLite, and MSSQL.
- **MySQL:** A relational database management system.

## Setup Instructions

1. **Clone the repository to your local machine:**

```bash
git clone https://github.com/Yogesh699/E-Commerce-ORM.git
```
2. **Install dependencies:**

```bash
npm install
```
3. Create Mysql Database
```bash
source db/schema.sql
```

3. **Set up the MySQL database:**
   set .env on the root of the folder and add
```bash
  DB_NAME='ecommerce_db'
  DB_USER=''
  DB_PW=''
```
  Add username and password of your own mysql database
  
4. Now seeding into the db
```bash
  npm run seed
```

5. Now start the project
```bash
npm run start
```

## API End Points

**All Categories**
GET http://localhost:3001/api/categories
**Individual Categories**
GET http://localhost:3001/api/categories/1
**Add Categories**
POST http://localhost:3001/api/categories
```bash
{
  "category_name": "Demo Category"
}
```
**Update Categories**
PUT http://localhost:3001/api/categories/1
```bash
{
  "category_name": "Demo Category edited"
}
```
**Delete Categories**
DELETE http://localhost:3001/api/categories/1


**All Tags**
GET http://localhost:3001/api/tags
**Individual Tags**
GET http://localhost:3001/api/tags/1
**Add Tags**
POST http://localhost:3001/api/tags
```bash
{
"tag_name":"Demo Tag"
}
```
**Update Tags**
PUT http://localhost:3001/api/tags/1
```bash
{
"tag_name":"Demo Tag edited"
}
```
**Delete Tags**
DELETE http://localhost:3001/api/tags/1


**All Product**
GET http://localhost:3001/api/products
**Individual Product**
GET http://localhost:3001/api/products/1
**Add Product**
POST http://localhost:3001/api/products
```bash
{
"product_name": "Demo Product",
"price": 200.00,
"stock": 3,
"category_id":1,
"tagIds": 2
}
```
**Update Product**
PUT http://localhost:3001/api/products/1
```bash
{
"product_name": "Demo Product edited",
"price": 100.00,
"stock": 5,
"category_id":5,
"tagIds": [2,3,4,5]
}
```
**Delete Product**
DELETE http://localhost:3001/api/products/1



## Walkthrough Video
Link to Walkthrough Video - Insert the link to your walkthrough video here.
In the walkthrough video, I demonstrate the functionality of the e-commerce back end, covering the following acceptance criteria:
Database Interaction: Show how Sequelize interacts with the MySQL database to perform CRUD operations on products.
Express.js API: Demonstrate the use of Express.js routes and controllers to handle various HTTP requests, such as fetching product information, creating new products, updating product details, and deleting products.




