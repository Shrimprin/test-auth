Rails.application.routes.draw do
  post '/api/auth/callback/github', to: 'api/users#create'
end
