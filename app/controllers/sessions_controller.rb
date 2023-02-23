class SessionsController < ApplicationController
    skip_before_action :authorize
    def create
        employee = Employee.find_by(email: params[:email])
        company = Company.find_by(email: params[:email])

        if employee&.authenticate(params[:password])
            session[:user_id] = employee.id
            session[:is_employer] = 0
            render json: employee, status: :created

        elsif company&.authenticate(params[:password])
            session[:user_id] = company.id
            session[:is_employer] = 1
            render json: company, status: :created
            
        else
            render json: { errors: "Invalid Username or Password"}, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end
end
