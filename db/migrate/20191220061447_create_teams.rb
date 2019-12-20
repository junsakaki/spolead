class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :name
      t.string :email
      t.integer :sport_id
      t.string :prefecture
      t.string :city
      t.integer :school_flag
      t.integer :target_flag
      t.text :comment

      t.timestamps
    end
  end
end
