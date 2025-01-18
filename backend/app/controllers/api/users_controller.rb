# frozen_string_literal: true

module Api
  class UsersController < ApplicationController
    # destoryは退会処理を作るなら必要

    private

    def user_params
      params.require(:user).permit(:name, :github_id)
    end
  end
end
