class AddCoordinatesToBlocks < ActiveRecord::Migration
  def change
    add_column :blocks, :coorX, :int
    add_column :blocks, :coorY, :int
  end
end
