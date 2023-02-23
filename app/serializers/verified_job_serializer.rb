class VerifiedJobSerializer < ActiveModel::Serializer
  attributes :id, :employee_id, :company_id

  has_one :employee
  has_one :company
end
