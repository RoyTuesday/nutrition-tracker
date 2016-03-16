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

  test "Should not save without name" do
    without_name = Nutrient.new({
      category: "category",
      unit_of_measure: "unit"
    })
    assert_not without_name.save, "Nutrient saved without a name!"
  end
end
