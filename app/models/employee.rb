class Employee < ApplicationRecord
    has_many :jobs, dependent: :destroy
    has_many :verified_jobs, dependent: :destroy
    has_many :companies, -> { distinct }, through: :verified_jobs

    validates :email, presence: true, uniqueness: true
    validates :password, presence: true
    validates :first_name, :last_name, presence: true

    has_secure_password
end
