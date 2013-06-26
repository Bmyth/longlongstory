Lls::Application.routes.draw do
  match '/' => 'nexus#index', :via => :get
  match '/api/blocks' => 'nexus#get_blocks', :via => :get
  match '/api/blocks' => 'nexus#add_block', :via => :put
  match '/api/blocks' => 'nexus#delete_block', :via => :delete
  match '/api/blocks/:id' => 'nexus#update_block', :via => :put
  match '/api/blocks/:id' => 'nexus#delete_block', :via => :delete
  match '/zero' => 'nexus#clear_all', :via => :get
  root :to => 'nexus#index'
end
