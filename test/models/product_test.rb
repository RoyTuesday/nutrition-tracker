require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  test "Should save with valid fields" do
    product = Product.new({name: "name", category: "category", serving_size: 1, serving_unit: "g", ndb_no: 123456})
    assert product.save, "Product did not save despite being given valid fields!"
  end
end
