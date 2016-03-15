class User < ActiveRecord::Base
  has_secure_password

  validates :username, uniqueness: true, presence: true, length: {minimum: 6, maximum: 32}
  validates :email, uniqueness: true, presence: true
  validates :email, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create}

  has_many :users_products
  has_many :products, through: :users_products
end
