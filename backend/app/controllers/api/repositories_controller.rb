# frozen_string_literal: true

module Api
  class RepositoriesController < ApplicationController
    def index
      repositories = @current_user.repositories
      render json: repositories, each_serializer: RepositoryShortSerializer
    end

    def show
      repository = @current_user.repositories.includes(file_items: :children).find(params[:id]) # 子供しかeager loadできていない？
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
      repository = Repository.new(user: @current_user, name: repository_name, url: repository_url)

      if repository.save_with_file_items(client)
        render json: repository, serializer: RepositoryShortSerializer, status: :created # そもそもidを返すだけならserializerはいらないかも
      else
        render json: repository.errors, status: :unprocessable_entity
      end
    end

    def update
    end

    def destroy
    end

    private

    def repository_params
      params.require(:repository).permit(:url)
    end
  end
end
