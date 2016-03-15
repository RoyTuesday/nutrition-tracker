class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.text :name, null: false
      t.text :category
      t.integer :serving_size, null: false
      t.string :serving_unit, null: false
      t.integer :ndb_no, null: false, unique: true, index: true

      t.timestamps null: false
    end
  end
end
