class Company < ApplicationRecord
    has_many :verifications, dependent: :destroy
    has_many :jobs, through: :verifications
    has_many :verified_jobs, dependent: :destroy
    has_many :employees, -> { distinct }, through: :verified_jobs

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true

    has_secure_password
end
