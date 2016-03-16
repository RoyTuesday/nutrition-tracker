class ProductsNutrient < ActiveRecord::Base
  validates :product_id, presence: true, numericality: {only_integer: true}
  validates :nutrient_id, presence: true, numericality: {only_integer: true}
  validates :quantity, presence: true

  belongs_to :product
  belongs_to :nutrient
end
