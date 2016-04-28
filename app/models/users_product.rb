class UsersProduct < ActiveRecord::Base
  validates :servings, presence: true, numericality: {greater_than: 0}
  validates :user_id, presence: true, numericality: {only_integer: true}
  validates :product_id, presence: true, numericality: {only_integer: true}
  validates :date_eaten, presence: true
  validates :price, presence: true

  belongs_to :user
  belongs_to :product

  has_many :products_nutrients, through: :product
  has_many :nutrients, through: :product

  delegate :name, to: :product
  delegate :category, to: :product
  delegate :serving_size, to: :product

  def get_nutrients_totals
    totals = Hash.new
    self.products_nutrients.each do |nutrient|
      if totals[nutrient.name]
        totals[nutrient.name][:value] += nutrient.quantity
      else
        totals[nutrient.name] = {
          value: nutrient.quantity,
          unit: nutrient.unit_of_measure
        }
      end
    end

    totals.each do |key, value|
      totals[key] = {
        value: value[:value].round(2),
        unit: value[:unit]
      }
    end

    return totals
  end
end
