require 'test_helper'

class NutrientTest < ActiveSupport::TestCase
  test "Should save with valid fields" do
    nutrient = Nutrient.new({
      name: "name",
      category: "category",
      unit_of_measure: "unit"
    })
    assert nutrient.save, "Nutrient did not save despite valid fields!"
  end
end
