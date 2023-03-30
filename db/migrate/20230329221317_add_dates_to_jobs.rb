class AddDatesToJobs < ActiveRecord::Migration[6.1]
  def change
    add_column :jobs, :from_date, :date
    add_column :jobs, :to_date, :date
  end
end
