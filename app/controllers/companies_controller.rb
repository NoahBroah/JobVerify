class CompaniesController < ApplicationController
    before_action :authorize, only: :show

    def create
        if Employee.where(email: params[:email]).exists?
            render json: { errors: "Oops, looks like you've already signed up as an Employee, Please Login" }, status: :unprocessable_entity
        else
            company = Company.create(company_params)
            session[:user_id] = company.id
            session[:is_employer] = 1
            if company.valid?
                render json: company, status: :created
            else
                render json: { errors: company.errors.full_messages }, status: :unprocessable_entity
            end
        end
    end

    def update
        company = Company.find_by(id: params[:id])
        company.update(company_params)
        if company.id == current_user.id
            render json: company, status: :ok
        else
            render json: { errors: ["Not Authorized"]}, status: :unauthorized
        end
    end

    def destroy
        company = Company.find_by(id: params[:id])
        if company.id == current_user.id
            company.delete
            head :no_content
        else
            render json: { errors: ["Not Authorized"]}, status: :unauthorized
        end
    end

    def show
        render json: current_user, status: :ok
    end

    def index
        companies = Company.all
         render json: companies
    end


    private

    def company_params
        params.permit(:email, :password, :name)
    end
end
