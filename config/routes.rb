Lls::Application.routes.draw do
  match '/' => 'nexus#index', :via => :get
  match '/api/blocks' => 'nexus#get_blocks', :via => :get
  match '/api/blocks' => 'nexus#update_blocks', :via => :put
  match '/api/blocks' => 'nexus#add_block', :via => :post
  match '/api/blocks/:id' => 'nexus#update_block', :via => :put
  match '/api/blocks/:id' => 'nexus#delete_block', :via => :delete
  match '/block_form_update' => 'nexus#update_block_content', :via => :post
  match '/zero' => 'nexus#clear_all', :via => :get
  root :to => 'nexus#index'
end
