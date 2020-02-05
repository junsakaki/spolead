class ReviewsController < ApplicationController
  
  def index
  end

  def show
  end

  def new
    @review = Review.new
  end

  def create
    @review = current_user.reviews.build(review_params)
    if @review.save
      flash[:success] = '口コミが正常に投稿されました'
      redirect_to root_url
    else
      flash.now[:danger] = '口コミが投稿できませんでした'
      render :new
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

private

  def review_params
    params.require(:review).permit(:gender, :age, :enrollment, :player_flag, :general_star, :general_post, :policy_star, :policy_post, :organization_star, :organization_post, :activity_star, :activity_post, :environment_star, :environment_post, :event_star, :event_post, :cost_star, :cost_post)
  end
  
  def current_user
    @reviews = current_user.reviews.find_by(id: params[:id])
    unless @reviews
      redirect_to root_url
    end
  end
end
