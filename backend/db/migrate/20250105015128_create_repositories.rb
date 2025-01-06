class CreateRepositories < ActiveRecord::Migration[7.2]
  def change
    create_table :repositories do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :url, null: false

      t.timestamps
    end
  end
end
