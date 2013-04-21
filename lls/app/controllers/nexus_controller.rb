class NexusController < ApplicationController
  def index
    @blocks = Block.find :all
    @resolution = 1
  end
end
