# Nutrition Tracker

A simple web app for keeping track of your daily diet.

I used the <a href='https://ndb.nal.usda.gov/ndb/api/doc' target="_blank">USDA National Nutritional Database (NDB) API</a> to gather information on both processed and prepared foods.

### A user can:

* Look up a food by name, using the USDA's NDB API
* Record having eaten a food, how much of it was eaten, and on what day
* Review what foods were eaten each day
* Sort the daily food record by servings, nutrients, and food category

In order to limit how many requests are made while using the app, new foods are stored in a Rails database. Each nutrient also has its own reusable record in order to reduce storage size and simplify filtering. The NDB is an extensive database with a plethora of nutritional information, and it proved the easiest to use.

The JSON API from <a href="http://openfoodfacts.org" target="_blank">openfoodfacts.org</a> was initially appealing, but failed to cover as wide a range of products as needed. The API only allows a query by UPC, reducing its usefulness.

<a href="http://www.product-open-data.com/navigate/">Product Open Data</a> (POD) provided a more comprehensive listing of food products, but did not yet have an available API. Using POD would have required downloading a 200+ MB database, and I decided against that.

## Technologies

This application uses Ruby on Rails 4 as the backend, jQuery, HTML5, and CSS 3 for the front end, and AJAX to handle server requests.

The Rails database stores product and nutrient records to reduce the number of requests made to the USDA's NDB

I used AJAX and jQuery to create a single-page app: altering parts of the web page as necessary, rather than loading a new page with every request. The only request not handled by AJAX is the logout. I decided that the logout link should redirect to the home page to ensure any pages that require a user would not be accessible after logging out. The alternative would be potentially more time-consuming and more difficult to maintain: a logout AJAX request would need to be able to alter every sensitive page appropriately, and such a system would be prone to errors.

## Features

Unchecked boxes are not yet implemented

:white_check_mark: Find food from NDB by name

:white_check_mark: Find food in Rails database by name

:white_check_mark: Register a new user (create new user record)

:white_check_mark: A user can create new record of a food eaten: when, how much, and what it cost

:white_check_mark: A user can edit any food eaten record they created

:white_check_mark: A user can delete any food eaten record they created

:white_medium_small_square: Filter records of food eaten

## Schemas

<img src="mvp-schema.png" title="MVP Schema"/>

Original schema for the Minimum Viable Product (MVP), including a table to store product names for easier searchability.
