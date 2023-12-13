# Store API <img src="assets/logo.png" alt="drawing" width="27px"/>

This project showcases the retrieval of products in a store, database. 
It incorporates functionality for **filtering, sorting, and pagination** based on user-defined criterias.

More information on the exposed web service can be found in the below API documentation.

- [**Products API documentation**](https://documenter.getpostman.com/view/25306703/2s9YkjBija)

#### Highlighted features of the application,
- Products are capable of being filtered based on criteria such as name, company, and the featured attribute within the Product document.
- It can filter user-specified fields from the document.
- It has the capability to sort based on either a single given field or a list of specified fields.
- It offers the ability to establish numeric filters for refining results based on the price and rating fields.
- It incorporates server-side pagination functionality to retrieve data in sequential chunks, facilitating efficient data handling and retrieval.

## Used Technologies
- Node.js
- Express.js
- Mongoose
- MongoDB

#### Used Integrated Development Environment
- VS Code

## How to use ?

1. Clone the project using `https://github.com/PubuduJ/store-api.git` terminal command.
2. Change the `MongoDB configuration properties` in the `.env` file to your local machine MongoDB configurations.
3. Open terminal from the project directory and run `node src/populate.js` to add sample products to `store-db` from the `products.json` file.
4. Run `npm install` and `npm start` to run the server.

## Version
v1.0.0

## License
Copyright &copy; 2023 [Pubudu Janith](https://www.linkedin.com/in/pubudujanith/). All Rights Reserved.<br>
This project is licensed under the [MIT license](LICENSE.txt).