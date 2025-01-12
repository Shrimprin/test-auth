# frozen_string_literal: true

class RepositoryShortSerializer < ActiveModel::Serializer
  attributes :id, :name
  # TODO: ここに進捗と最後にタイプした時間（～時間前）のロジックを作っておく
end
