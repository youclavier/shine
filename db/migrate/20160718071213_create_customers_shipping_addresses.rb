class CreateCustomersShippingAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :customers_shipping_addresses do |t|

      t.timestamps
    end
  end
end
