# frozen_string_literal: true

FactoryBot.define do
  factory :repository do
    name { 'Sample Repository' }
    url { 'sample/repository' }
    user
  end
end
