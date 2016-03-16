class Nutrient < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :category, presence: true
  validates :unit_of_measure, presence: true

  has_many :products_nutrients
end
