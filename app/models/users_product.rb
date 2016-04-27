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
    totals = Hash.new(0)
    self.products_nutrients.each do |nutrient|
      totals[nutrient.name] += nutrient.quantity
    end

    totals.each do |key, value|
      totals[key] = value.round(2)
    end

    return totals
  end
end
