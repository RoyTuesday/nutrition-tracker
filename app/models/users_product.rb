class UsersProduct < ActiveRecord::Base
  validates :servings, presence: true, numericality: {greater_than: 0}
  validates :user_id, presence: true, numericality: {only_integer: true}
  validates :product_id, presence: true, numericality: {only_integer: true}
  validates :date_eaten, presence: true
  validates :price, presence: true

  belongs_to :user
  belongs_to :product

  delegate :name, to: :product
  delegate :category, to: :product
  delegate :serving_size, to: :product
end
