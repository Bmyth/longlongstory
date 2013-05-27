class Block < ActiveRecord::Base
  attr_accessible :title, :body, :img, :coorX, :coorY
  mount_uploader :img, BlockImageUploader
end
