class Job < ApplicationRecord
  belongs_to :employee
  has_many :verifications, dependent: :destroy

  validates :from_date, presence: true
  validates :to_date, presence: true

end
