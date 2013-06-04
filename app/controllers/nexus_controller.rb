class NexusController < ApplicationController
  def index
    @blocks = Block.find :all
    @resolution = 1
  end

  def get_blocks
    render :json => (Block.find :all).to_json
  end

  def add_block
    block = Block.create!
    block.title = params[:title]
    block.coorX = params[:coorX]
    block.coorY = params[:coorY]
    block.save!
    render :json => {:success => 'y'}
  end

  def update_block
    block = Block.find(params[:id])
    block.title = params[:title]
    block.save!
    render :json => {:success => 'y'}
  end

  def create_block_with_image
    block = Block.create! params[:block]
    render :json => block
  end

  def delete_block
    block = Block.find(params[:id])
    block.destroy
    render :json => {:success => 'y'}
  end

  def clear_all
    Block.destroy_all
    redirect_to "/"
  end
end
