class CreateNutrients < ActiveRecord::Migration
  def change
    create_table :nutrients do |t|
      t.text :name, null: false, unique: true, index: true
      t.text :category, null: false
      t.text :unit_of_measure, null: false

      t.timestamps null: false
    end
  end
end
