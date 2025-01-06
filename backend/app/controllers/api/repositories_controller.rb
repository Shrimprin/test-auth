# frozen_string_literal: true

module Api
  class RepositoriesController < ApplicationController
    before_action :set_user, only: %i[create]

    def index
    end

    def show
      repository = Repository.includes(file_items: :children).find(params[:id]) # 子供しかeager loadできていない？
      render json: repository, include: '**' # 再帰的に全てのfile_itemsを取得してシリアライズする
    end

    def new
    end

    def edit
    end

    def create
      client = Octokit::Client.new(access_token: params[:access_token])
      url = repository_params[:url] # 正規表現とかでチェックする必要はありそう
      repository_url = URI(url).path[1..] # /user/repository
      repository_info = client.repository(repository_url)
      repository_name = repository_info.name
      repository = Repository.new(user: @user, name: repository_name, url: repository_url)

      if repository.save_with_file_items(client)
        render json: repository, serializer: RepositoryShortSerializer
      else
        render json: repository.errors, status: :unprocessable_entity
      end
    end

    def update
    end

    def destroy
    end

    private

    def set_user
      @user = User.find_by(github_id: params[:github_id])
    end

    def repository_params
      params.require(:repository).permit(:url)
    end
  end
end
