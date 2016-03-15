require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  test "Should save with valid fields" do
    product = Product.new({name: "name", category: "category", serving_size: 1, serving_unit: "g", ndb_no: 123456})
    assert product.save, "Product did not save despite being given valid fields!"
  end

  test "Should not save without name" do
    without_name = Product.new({category: "category", serving_size: 1, serving_unit: "g", ndb_no: 123456})
    assert_not without_name.save, "Product saved without name!"
  end
end
