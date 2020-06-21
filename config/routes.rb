Rails.application.routes.draw do
  root 'pages#index'
  namespace :api do
    namespace :v1 do
      resources :grid, only: [:create]
    end
  end
  get '*path' => 'pages#index', via: :all
end
