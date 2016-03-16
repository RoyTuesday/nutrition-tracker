class ProductsNutrient < ActiveRecord::Base
  belongs_to :product
  belongs_to :nutrient
end
