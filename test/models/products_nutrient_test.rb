require 'test_helper'

class ProductsNutrientTest < ActiveSupport::TestCase
  test "Should save with valid fields" do
    products_nutrient = ProductsNutrient.new({
      product: products(:beets),
      nutrient: nutrients(:water),
      quantity: 1
    })
    assert products_nutrient.save, "Product's nutrient did not save despite valid fields!"
  end

  test "Should not save without product" do
    without_product = ProductsNutrient.new({
      nutrient: nutrients(:water),
      quantity: 1
    })
    assert_not without_product.save, "Product's nutrient saved without a product!"
  end

  test "Should not save without nutrient" do
    without_nutrient = ProductsNutrient.new({
      product: products(:beets),
      quantity: 1
    })
    assert_not without_nutrient.save, "Product's nutrient saved without a nutrient!"
  end

  test "Should not save without quantity" do
    without_quantity = ProductsNutrient.new({
      product: products(:beets),
      nutrient: nutrients(:water),
    })
    assert_not without_quantity.save, "Product's nutrient saved without a quantity!"
  end
end
