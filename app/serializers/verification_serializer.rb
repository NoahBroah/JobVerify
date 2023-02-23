class VerificationSerializer < ActiveModel::Serializer
  attributes :id, :job_id, :company_id, :verified
  has_one :job
end
