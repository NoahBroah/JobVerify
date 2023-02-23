class VerifiedJob < ApplicationRecord
    belongs_to :company
    belongs_to :employee

    validates :company_id, uniqueness: { scope: :employee_id } 

end
