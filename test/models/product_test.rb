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

  test "Should not save if serving size equals zero" do
    zero_serving_size = Product.new({
      name: "name",
      category: "category",
      serving_size: 0,
      serving_unit: 'g',
      ndb_no: 123456
    })
    assert_not zero_serving_size.save, "Product saved with zero serving size!"
  end

  test "Should not save if serving size is less than zero" do
    negative_serving_size = Product.new({
      name: "name",
      category: "category",
      serving_size: -1,
      serving_unit: 'g',
      ndb_no: 123456
    })
    assert_not negative_serving_size.save, "Product saved with serving size less than zero!"
  end

  test "Should not save without serving unit" do
    without_serving_unit = Product.new({name: "name", category: "category", serving_size: 1, ndb_no: 123456})
    assert_not without_serving_unit.save, "Product saved without serving unit"
  end

  test "Should not save without ndb number" do
    without_ndb_no = Product.new({name: "name", category: "category", serving_size: 1, serving_unit: "g"})
    assert_not without_ndb_no.save, "Product saved without ndb number!"
  end

  test "Should not save if ndb number already in database" do
    duplicate_ndb_no = Product.new({name: "name", category: "category", serving_size: 1, serving_unit: "g", ndb_no: products(:beets)})
    assert_not duplicate_ndb_no.save, "Product saved desite ndb number already in database!"
  end
end
