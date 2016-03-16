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

  test "Should not save without servings" do
    without_servings = UsersProduct.new({
      user: users(:charlotte),
      product: products(:beets),
      date_eaten: "3/16/2016",
      price: "$1.00"
    })
    assert_not without_servings.save, "User's product saved without servings!"
  end

  test "Should not save if servings is equal to 0" do
    zero_servings = UsersProduct.new({
      servings: 0,
      user: users(:charles),
      product: products(:beets),
      date_eaten: "3/16/2016",
      price: "$1.00"
    })
    assert_not zero_servings.save, "User's product saved with 0 servings!"
  end

  test "Should not save without user" do
    without_user = UsersProduct.new({
      servings: 1,
      product: products(:beets),
      date_eaten: "3/16/2016",
      price: "$1.00"
    })
    assert_not without_user.save, "User's product saved without a user!"
  end

  test "Should not save without product" do
    without_product = UsersProduct.new({
      servings: 1,
      user: users(:charles),
      date_eaten: "3/16/2016",
      price: "$1.00"
    })
    assert_not without_product.save, "User's product saved without a product!"
  end

  test "Should not save without date_eaten" do
    without_date_eaten = UsersProduct.new({
      servings: 1,
      user: users(:charlotte),
      product: products(:beets),
      price: "$1.00"
    })
    assert_not without_date_eaten.save, "User's product saved without date_eaten!"
  end

  test "Should not save without price" do
    without_price = UsersProduct.new({
      servings: 1,
      user: users(:charles),
      product: products(:beets),
      date_eaten: "3/16/2016"
    })
    assert_not without_price.save, "User's product saved without price!"
  end
end
