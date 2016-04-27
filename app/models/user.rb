class User < ActiveRecord::Base
  has_secure_password

  validates :username, uniqueness: true, presence: true, length: {minimum: 6, maximum: 32}
  validates :email, uniqueness: true, presence: true
  validates :email, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create}

  has_many :users_products
  has_many :products, through: :users_products

  def get_nutrients_totals
    totals = Hash.new
    self.users_products.each do |users_product|
      totals.merge! users_product.get_nutrients_totals do |key, oldval, newval|
        oldval + newval
      end
    end

    totals.each do |key, value|
      totals[key] = value.round(2).to_s + Nutrient.find_by(name: key).unit_of_measure
    end

    return totals
  end
end
