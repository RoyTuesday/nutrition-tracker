class SessionsController < ApplicationController
  def new
    @user = User.new
    if request.xhr?
      render partial: 'form', layout: false, locals: {user: @user}
    end
  end
end
