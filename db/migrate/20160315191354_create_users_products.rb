class CreateUsersProducts < ActiveRecord::Migration
  def change
    create_table :users_products do |t|
      t.integer :servings, null: false
      t.integer :user_id, null: false, foreign_key: true
      t.integer :product_id, null: false, foreign_key: true
      t.date :date_eaten, null: false
      t.string :price, null: false

      t.timestamps null: false
    end
  end
end
