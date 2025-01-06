# frozen_string_literal: true

module Api
  class UsersController < ApplicationController
    def create
      # 引数の条件に該当するuserを返す。存在しないなら作成する
      user = User.find_or_create_by!(user_params)
      if user
        head :ok
      else
        render json: { error: 'ログインに失敗しました' }, status: unprocessable_entity
      end
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end

    # destoryは退会処理を作るなら必要

    private

    def user_params
      params.require(:user).permit(:name, :github_id)
    end
  end
end
