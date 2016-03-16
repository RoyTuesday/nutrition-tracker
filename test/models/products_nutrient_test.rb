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
end
