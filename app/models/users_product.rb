class UsersProduct < ActiveRecord::Base
  validates :servings, presence: true, numericality: {only_integer: true}
  validates :user_id, presence: true, numericality: {only_integer: true}
  validates :product_id, presence: true, numericality: {only_integer: true}
  validates :date_eaten, presence: true
  validates :price, presence: true

  belongs_to :user
  belongs_to :product
end
