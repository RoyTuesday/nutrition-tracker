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
      render json: user.get_nutrients_totals(params[:date_range]).as_json
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
