class VerifiedJobsController < ApplicationController
    skip_before_action :authorize
    

    def create
        company = current_user
        verified_job = company.verified_jobs.create(verified_params)
        if verified_job.valid? && (session[:is_employer] === 1)
            render json: verified_job, status: :created
        else
            render json: { errors: verified_job.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        verified_job = VerifiedJob.find_by(id: params[:id])
        render json: verified_job, status: :ok
    end

    def index
        verified_jobs = VerifiedJob.all
        render json: verified_jobs, status: :ok
    end

    private
    
    def verified_params
        params.permit(:employee_id)
    end
end
