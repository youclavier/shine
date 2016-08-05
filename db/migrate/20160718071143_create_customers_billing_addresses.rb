class CreateCustomersBillingAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :customers_billing_addresses do |t|

      t.timestamps
    end
  end
end
