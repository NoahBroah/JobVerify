class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_digest
  has_many :verifications
  has_many :employees
end
