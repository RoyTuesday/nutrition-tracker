class UsersProduct < ActiveRecord::Base
  validates :servings, presence: true, numericality: {greater_than: 0}
  validates :user_id, presence: true, numericality: {only_integer: true}
  validates :product_id, presence: true, numericality: {only_integer: true}
  validates :date_eaten, presence: true
  validates :price, presence: true

  def initialize args = {}
    super
    if /\d{1,}\/\d{1,}\/\d{4}/.match args[:date_eaten]
      self.date_eaten = format_date args[:date_eaten]
    end
  end

  belongs_to :user
  belongs_to :product

  delegate :name, to: :product
  delegate :category, to: :product
  delegate :serving_size, to: :product

  private

  def format_date date
    date_params = date.split('/').map!(&:to_i)
    Date.new date_params[2], date_params[0], date_params[1]
  end
end
