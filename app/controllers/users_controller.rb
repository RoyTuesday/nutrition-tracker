class UsersController < ApplicationController
  def new
    @user = User.new
    if request.xhr?
      render partial: "form", layout: false, locals: {user: @user}
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      if request.xhr?
        render json: {userNav: render_to_string("sessions/_user_nav", layout: false, user: @user)}
      end
    else
      @errors = @user.errors.full_messages
      if request.xhr?
        render json: {errors: @errors}
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
