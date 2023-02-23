class JobSerializer < ActiveModel::Serializer
  attributes :id, :company, :title, :description, :employee_id
  has_one :employee
  has_many :verifications
end
