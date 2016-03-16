# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'csv'

def csv_to_array_of_hashes path
  new_array = Array.new
  CSV.foreach(path, headers: true, header_converters: :symbol, converters: :all) do |row|
    new_array << Hash[row.headers.zip(row.fields)]
  end
  new_array
end

nutrients = csv_to_array_of_hashes './db/nutrients.csv'

nutrients.each {|nutrient| Nutrient.create! nutrient}

granola_params = JSON.parse(File.read './db/granola.json')
granola = Product.create({
  name: granola_params["name"],
  category: granola_params["category"],
  serving_size: granola_params["serving_size"],
  serving_unit: granola_params["serving_unit"],
  ndb_no: granola_params["ndb_no"],
})

granola_params["nutrients"].each do |nutrient|
  ProductsNutrient.create({
    product: granola,
    nutrient: Nutrient.find_by(name: nutrient["name"]),
    quantity: nutrient["quantity"]
  })
end

user = User.create({
  username: "user01",
  email: "email@example.com",
  password: "password"
})

UsersProduct.create({
  servings: 2,
  user: user,
  product: granola,
  date_eaten: "3/15/2016",
  price: "$2.00"
})
UsersProduct.create({
  servings: 3,
  user: user,
  product: granola,
  date_eaten: "3/16/2016",
  price: "$3.00"
})
