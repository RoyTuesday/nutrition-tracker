class UsersController < ApplicationController
  def new
    @user = User.new
    if request.xhr?
      render partial: "form", layout: false, locals: {user: @user}
    end
  end

  def create
    user = User.new(user_params)
    if request.xhr?
      if user.save
        session[:user_id] = user.id
        render json: {result: "success!", user: user}
      else
        errors = user.errors.full_messages
        render json: {errors: errors}
      end
    end
  end

  def show
    @user = User.includes(:users_products, :products).find_by(id: session[:user_id])
  end

  def nutrients_totals
    user = User.includes(:users_products).find_by id: session[:user_id]
    if request.xhr?
      render json: user.get_nutrients_totals(date_range).as_json
    end
  end

  def nutrients_over_time
    user = User.includes(:users_products).find_by id: session[:user_id]
    if user && request.xhr?
      render json: user.get_nutrients_over_time(params[:nutrient_name], params[:date_range]).as_json
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

  def date_range
    if params[:start_date].length > 0
      start_date = params[:start_date].to_date
      if params[:end_date].length > 0
        end_date = params[:end_date].to_date
        return start_date..end_date
      else
        return start_date..start_date
      end
    else
      return false
    end
  end
end
