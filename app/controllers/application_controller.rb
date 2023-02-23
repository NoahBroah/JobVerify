class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authorize
  skip_before_action :authorize, only: :show

  def show
    render json: current_user, status: :ok
  end


  def current_user
    if (session[:is_employer] === 1)
      @current_user ||= Company.find_by(id: session[:user_id])
    else
      @current_user ||= Employee.find_by(id: session[:user_id])
    end
  end
  
  def authorize
    render json: { error: "Not Authorized" }, status: :unauthorized unless current_user
  end

end
