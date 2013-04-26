class NexusController < ApplicationController
  def index
    @blocks = Block.find :all
    @resolution = 1
  end

  def get_blocks
    render :json => (Block.find :all).to_json
  end

  def create_block
    blocl = Block.create! params[:block]
    redirect_to "/"
  end

  def clear_all
    Block.destroy_all
    redirect_to "/"
  end
end
