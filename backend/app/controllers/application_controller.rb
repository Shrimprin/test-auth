# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_request!

  def authenticate_request!
    header = request.headers['Authorization']
    token = header.split.last if header

    decoded = JsonWebToken.decode(token)
    @current_user = User.find(decoded[:user_id]) if decoded
  rescue ActiveRecord::RecordNotFound, JWT::DecodeError
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
