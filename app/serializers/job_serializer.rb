class JobSerializer < ActiveModel::Serializer
  attributes :id, :company, :title, :description, :employee_id, :to_date, :from_date
  has_one :employee
  has_many :verifications
end
