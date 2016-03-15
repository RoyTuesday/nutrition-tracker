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

  test "Should not save without category" do
    without_category = Product.new({name: "name", serving_size: 1, serving_unit: "g", ndb_no: 123456})
    assert_not without_category.save, "Product saved without category!"
  end

  test "Should not save without serving size" do
    without_serving_size = Product.new({name: "name", category: "category", serving_unit: "g", ndb_no: 123456})
    assert_not without_serving_size.save, "Product saved without serving size!"
  end
end
