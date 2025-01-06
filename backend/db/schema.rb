# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_01_05_074144) do
  create_table "file_item_hierarchies", id: false, force: :cascade do |t|
    t.integer "ancestor_id", null: false
    t.integer "descendant_id", null: false
    t.integer "generations", null: false
    t.index ["ancestor_id", "descendant_id", "generations"], name: "file_item_anc_desc_idx", unique: true
    t.index ["descendant_id"], name: "file_item_desc_idx"
  end

  create_table "file_items", force: :cascade do |t|
    t.integer "repository_id", null: false
    t.string "name", null: false
    t.integer "type", null: false
    t.text "content"
    t.integer "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["repository_id"], name: "index_file_items_on_repository_id"
  end

  create_table "repositories", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "name", null: false
    t.string "url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_repositories_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "github_id"
    t.index ["github_id"], name: "index_users_on_github_id", unique: true
  end

  add_foreign_key "file_items", "repositories"
  add_foreign_key "repositories", "users"
end
