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
