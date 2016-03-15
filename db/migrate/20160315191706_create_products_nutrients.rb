class CreateProductsNutrients < ActiveRecord::Migration
  def change
    create_table :products_nutrients do |t|
      t.integer :product_id, null: false, foreign_key: true
      t.integer :nutrient_id, null: false, foreign_key: true
      t.integer :quantity, null: false

      t.timestamps null: false
    end
  end
end
