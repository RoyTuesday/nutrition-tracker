class User < ActiveRecord::Base
  has_secure_password

  validates :username, uniqueness: true, presence: true, length: {minimum: 6, maximum: 32}
  validates :email, uniqueness: true, presence: true
  validates :email, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create}

  has_many :users_products
  has_many :products, through: :users_products

  def get_nutrients_totals date = nil
    users_products = self.users_products.to_a
    if date
      users_products.select! do |users_product|
        users_product.date_eaten == date
      end
    end
    totals = Hash.new
    users_products.each do |users_product|
      totals.merge! users_product.get_nutrients_totals do |key, oldval, newval|
        {
          value: oldval[:value] + newval[:value],
          unit: oldval[:unit]
        }
      end
    end

    totals.each do |key, value|
      totals[key] = value[:value].round(2).to_s + value[:unit]
    end

    return totals
  end
end
