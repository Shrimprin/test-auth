# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'Sample User' }
    github_id { 'sample_github_id' }
  end
end
