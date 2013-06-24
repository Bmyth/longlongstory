class NexusController < ApplicationController
  def index
    @blocks = Block.find :all
    @resolution = 1
  end

  def get_blocks
    render :json => (Block.find :all).to_json
  end

  def update_blocks
    add_block
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

  def create_block_with_body
    block = Block.create! params[:block]
    redirect_to "/"
  end

  def update_block_with_image
    block = Block.find(params[:block][:id])
    if !block.nil?
      block.update_attributes!(params[:block])
      render :json => block
    else
      render :json => {:success => 'n'}
    end
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
