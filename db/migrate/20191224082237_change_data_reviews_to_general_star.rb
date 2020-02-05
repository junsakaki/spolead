class ChangeDataReviewsToGeneralStar < ActiveRecord::Migration[5.2]
  def change
    change_column :reviews, :general_star, :float
    change_column :reviews, :policy_star, :float
    change_column :reviews, :organization_star, :float
    change_column :reviews, :activity_star, :float
    change_column :reviews, :environment_star, :float
    change_column :reviews, :event_star, :float
    change_column :reviews, :cost_star, :float
  end
end
