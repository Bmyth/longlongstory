Lls::Application.routes.draw do
  match '/' => 'nexus#index', :via => :get
  match '/api/blocks' => 'nexus#get_blocks', :via => :get
  match '/api/blocks/:id' => 'nexus#delete_block', :via => :delete
  match '/create' => 'nexus#create_block', :via => :post
  match '/zero' => 'nexus#clear_all', :via => :get
  root :to => 'nexus#index'
end
