class SessionsController < ApplicationController
  def new
    @user = User.new
    if request.xhr?
      render partial: 'form', layout: false, locals: {user: @user}
    end
  end

  def create
    @user = User.find_by(email: params[:user][:email])
    if request.xhr?
      if @user and @user.authenticate params[:user][:password]
        session[:user_id] = @user.id
        render json: {user: @user}
      else
        @errors = ["Email, password, or both are incorrect"]
        render json: {formWithErrors: render_to_string("sessions/_form", layout: false, errors: @errors)}
      end
    end
  end

  def destroy
    session.clear
    if request.xhr?
      render html: "Success!"
    else
      redirect :root
    end
  end
end
