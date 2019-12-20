class AddGeneralStarToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :general_star, :integer
    add_column :reviews, :general_post, :text
    add_column :reviews, :policy_star, :integer
    add_column :reviews, :policyl_post, :text
    add_column :reviews, :organization_star, :integer
    add_column :reviews, :organization_post, :text
    add_column :reviews, :activity_star, :integer
    add_column :reviews, :activity_post, :text
    add_column :reviews, :environment_star, :integer
    add_column :reviews, :environment_post, :text
    add_column :reviews, :event_star, :integer
    add_column :reviews, :event_post, :text
    add_column :reviews, :cost_star, :integer
    add_column :reviews, :cost_post, :text
  end
end
