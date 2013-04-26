class NexusController < ApplicationController
  def index
    @blocks = Block.find :all
    @resolution = 1
  end

  def get_blocks
    render :json => (Block.find :all).to_json
  end
end
