class SessionsController < ApplicationController
  def new
    @user = User.new
    if request.xhr?
      render partial: 'form', layout: false, locals: {user: @user}
    end
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user and @user.authenticate params[:password]
      session[:user_id] = @user.id
      redirect_to :root
    else
      @errors = ["Email, password, or both are incorrect"]
      render partial: "form", layout: false, locals: {user: @user}
    end
  end
end
