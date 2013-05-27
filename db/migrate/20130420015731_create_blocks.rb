class CreateBlocks < ActiveRecord::Migration
  def change
    create_table :blocks do |t|
      t.string   "title"
      t.string   "body"
      t.string   "summary"
      t.string   "img"
      t.datetime "created_at",     :null => false
      t.datetime "updated_at",     :null => false
      t.timestamps
    end
  end
end
