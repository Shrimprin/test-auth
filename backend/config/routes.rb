Rails.application.routes.draw do
  post '/api/auth/callback/github', to: 'api/users#create'
  namespace :api do
    resources :repositories, only: [:show, :create]
  end
end
