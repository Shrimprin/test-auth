class AddGithubIdToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :github_id, :integer
    add_index :users, :github_id, unique: true
    remove_column :users, :email, :string
  end
end
