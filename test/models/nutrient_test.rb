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

  test "Should not save if name is already in database" do
    duplicate_name = Nutrient.new({
      name: nutrients(:water).name,
      category: "category",
      unit_of_measure: "unit"
    })
    assert_not duplicate_name.save, "Nutrient saved with name already in database!"
  end

  test "Should not save without a category" do
    without_category = Nutrient.new({
      name: "name",
      unit_of_measure: "unit"
    })
    assert_not without_category.save, "Nutrient saved without a category!"
  end

  test "Should not save without a unit_of_measure" do
    without_unit = Nutrient.new({
      name: "name",
      category: "category"
    })
    assert_not without_unit.save, "Nutrient saved without a unit_of_measure!"
  end
end
