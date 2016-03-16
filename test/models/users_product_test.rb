require 'test_helper'

class UsersProductTest <ActiveSupport::TestCase
  test "Should save with valid fields" do
    users_product = UsersProduct.new({
      servings: 1,
      user: users(:charles),
      product: products(:beets),
      date_eaten: "3/16/2016",
      price: "$1.00"
    })
    assert users_product.save, "User's product didn't save despite valid fields!"
  end
end
