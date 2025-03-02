# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Repositories' do
  let(:user) { create(:user) }
  let(:headers) { { 'Authorization' => "Bearer #{JsonWebToken.encode(user_id: user.id)}" } }

  describe 'GET /api/repositories' do
    it 'returns a list of repositories' do
      create_list(:repository, 3, user: user)

      get api_repositories_path, headers: headers

      expect(response).to have_http_status(:ok)
      json = response.parsed_body
      expect(json.size).to eq(3)
    end
  end

  describe 'POST /api/repositories' do
    # 実際はGitHubのAPIをモックしたりする？
    let(:repository_attributes) { { repository: { url: 'https://github.com/Shrimprin/react-memo-app' } } }

    it 'creates a new repository' do
      expect do
        post api_repositories_path, params: repository_attributes, headers: headers
      end.to change(Repository, :count).by(1)

      expect(response).to have_http_status(:created)
    end
  end
end
