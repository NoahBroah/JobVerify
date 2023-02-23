class CreateVerifications < ActiveRecord::Migration[6.1]
  def change
    create_table :verifications do |t|
      t.integer :job_id
      t.integer :company_id
      t.boolean :verified, default: true

      t.timestamps
    end
  end
end
