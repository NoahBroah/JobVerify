class CreateJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :jobs do |t|
      t.string :company
      t.string :title
      t.string :description
      t.integer :employee_id

      t.timestamps
    end
  end
end
