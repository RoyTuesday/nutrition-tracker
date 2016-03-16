class Nutrient < ActiveRecord::Base
  has_many :products_nutrients
end
