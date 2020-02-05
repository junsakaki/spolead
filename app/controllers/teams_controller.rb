class TeamsController < ApplicationController
  
  def index
  end

  def show
    @team = Team.find(params[:id])
  end

  def new
    @team = Team.new
  end

  def create
    @team = Team.new(team_params)

    if @team.save
      flash[:success] = 'チームを登録しました。'
      redirect_to root_url
    else
      flash.now[:danger] = 'チームの登録に失敗しました。'
      render :new
    end
  end

  def edit
    @team = Team.find(params[:id])
  end

  def update
    @team = Team.find(params[:id])
    
    if @team.update(team_params)
       flash[:success] = 'チーム情報を更新しました。'
       redirect_to root_url
    else
       flash.now[:danger] = 'チーム情報が更新されませんでした。'
       render :edit
    end
  end

  def destroy
  end

private
  
  def search
    #Viewのformで取得したパラメータをモデルに渡す
    @teams = team.search(params[:search])
  end
  
  def team_params
    params.require(:team).permit(:name, :email, :sports_id, :prefectures, :city, :school_flag, :target_flag, :comment)
  end
  
  def corrent_user
    @teams = current_user.teams.find_by(id: params[:id])
    unless @teams
      redirect_to root_url
    end
  end
end
