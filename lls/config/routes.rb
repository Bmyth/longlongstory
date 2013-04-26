Lls::Application.routes.draw do
  match '/' => 'nexus#index', :via => :get
  match '/api/blocks' => 'nexus#get_blocks', :via => :get
  root :to => 'nexus#index'
end
