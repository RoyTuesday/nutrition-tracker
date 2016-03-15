# Nutrition Tracker

A simple web app for keeping track of your daily diet.

I used the <a href='https://ndb.nal.usda.gov/ndb/api/doc' target="_blank">USDA National Nutritional Database API</a> to gather information on both processed and prepared foods.

### A user can:

* Look up a food by name, using the USDA's NDB API
* Record having eaten a food, how much of it was eaten, and on what day
* Review what foods were eaten each day
* Sort the daily food record by servings, nutrients, and food category

In order to limit how many requests are made while using the app, new foods are stored in a Rails database. Each nutrient has its own reusable record in order to simplify storage.

The JSON API from <a href="http://openfoodfacts.org" target="_blank">openfoodfacts.org</a> was initially appealing, but failed to cover as wide a range of products as needed. The API only allows a query by UPC, reducing its usefulness.

<a href="http://www.product-open-data.com/navigate/">Product Open Data</a> (POD) provided a more comprehensive listing of food products, but did not yet have an available API. Using POD would have required downloading a 200+ MB database, and I decided against that.

## Features

Unchecked boxes are not yet implemented

:white_check_mark: Find food from NDB by name

:white_medium_small_square: Find food in Rails database by name

:white_check_mark: Register a new user (create new user record)

:white_medium_small_square: Create new record of food eaten by user

## Schemas

<img src="mvp-schema.png" title="MVP Schema"/>

Original schema for app MVP, including a table to store product names for easier searchability.
