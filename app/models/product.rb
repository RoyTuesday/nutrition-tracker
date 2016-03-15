class Product < ActiveRecord::Base
  validates :name, presence: true
  validates :category, presence: true
  validates :serving_size, presence: true
  validates :ndb_no, presence: true, uniqueness: true

  has_many :users_products
  has_many :products_nutrients
  has_many :nutrients, through: :products_nutrients
end
