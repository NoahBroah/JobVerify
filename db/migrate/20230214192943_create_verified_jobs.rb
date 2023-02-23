class CreateVerifiedJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :verified_jobs do |t|
      t.integer :employee_id
      t.integer :company_id

      t.timestamps
    end
  end
end
