# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_24_082237) do

  create_table "cities", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "kana"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "prefectures", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "kana"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reviews", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "team_id"
    t.string "gender"
    t.string "age"
    t.string "enrollment"
    t.integer "player_flag"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "general_star"
    t.text "general_post"
    t.float "policy_star"
    t.text "policyl_post"
    t.float "organization_star"
    t.text "organization_post"
    t.float "activity_star"
    t.text "activity_post"
    t.float "environment_star"
    t.text "environment_post"
    t.float "event_star"
    t.text "event_post"
    t.float "cost_star"
    t.text "cost_post"
    t.index ["team_id"], name: "index_reviews_on_team_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "sports", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teams", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.integer "sport_id"
    t.string "prefecture"
    t.string "city"
    t.integer "school_flag"
    t.integer "target_flag"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "reviews", "teams"
  add_foreign_key "reviews", "users"
end
