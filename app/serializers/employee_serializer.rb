class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest
  has_many :jobs
  has_many :companies
end
