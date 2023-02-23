class VerificationsController < ApplicationController
    skip_before_action :authorize
    def create
        company = current_user
        verification = company.verifications.create(verification_params)
        if verification.valid? && (session[:is_employer] === 1)
            render json: verification, status: :created
        else
            render json: { errors: verification.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        verifications = Verification.all
        render json: verifications, status: :ok
    end

    def show
        verification = Verification.find_by(id: params[:id])
        render json: verification, status: :ok
    end

  

    def destroy
        verification = Verification.find_by(id: params[:id])
        verification.delete
        head :no_content
    end


    private

    def verification_params
        params.permit(:job_id)
    end
end
