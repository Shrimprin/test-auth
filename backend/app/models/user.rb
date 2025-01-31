# frozen_string_literal: true

class User < ApplicationRecord
  validates :name, presence: true
  validates :github_id, presence: true, uniqueness: true

  has_many :repositories, dependent: :destroy
end
