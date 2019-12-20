class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.references :user, foreign_key: true
      t.references :team, foreign_key: true
      t.string :gender
      t.string :age
      t.string :enrollment
      t.integer :player_flag

      t.timestamps
    end
  end
end
