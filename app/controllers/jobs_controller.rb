class JobsController < ApplicationController
    skip_before_action :authorize, only: :index
    def create
        employee = current_user
        job = employee.jobs.create(job_params)
        if job.valid? && (session[:is_employer] === 0)
            render json: job, status: :created
        else
            render json: {errors: job.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        job = Job.find_by(id: params[:id])
        render json: job, status: :ok
    end

    def index
        jobs = Job.all
        render json: jobs, status: :ok
    end

    def destroy
        employee = current_user
        job = Job.find_by(id: params[:id])
        if job
        # employee.id == job.employee_id
            job.delete
            head :no_content
        else
            render json: { errors: ["Not Authorized"]}, status: :unauthorized
        end
    end

    private

    def job_params
        params.permit(:company, :title, :description,)
    end
end
