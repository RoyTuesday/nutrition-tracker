class ProductsNutrient < ActiveRecord::Base
  validates :product_id, presence: true, numericality: {only_integer: true}
  validates :nutrient_id, presence: true, numericality: {only_integer: true}
  validates :quantity, presence: true, numericality: {greater_than_or_equal_to: 0}

  belongs_to :product
  belongs_to :nutrient

  delegate :name, :category, :unit_of_measure, to: :nutrient
end
