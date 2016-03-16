class UsersProduct < ActiveRecord::Base
  validates :servings, presence: true, numericality: {only_integer: true}
  validates :user_id, presence: true, numericality: {only_integer: true}
  validates :product_id, presence: true, numericality: {only_integer: true}
  validates :date_eaten, presence: true
  validates :price, presence: true

  def initialize args
    super
    date_params = args[:date_eaten].split('/')
    date_params.map!(&:to_i)
    self.date_eaten = Date.new date_params[2], date_params[0], date_params[1]
  end

  belongs_to :user
  belongs_to :product
end
