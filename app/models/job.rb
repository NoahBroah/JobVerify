class Job < ApplicationRecord
  belongs_to :employee
  has_many :verifications, dependent: :destroy

end
