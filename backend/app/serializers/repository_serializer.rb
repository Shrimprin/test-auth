# frozen_string_literal: true

class RepositorySerializer < ActiveModel::Serializer
  attributes :id, :name, :url, :file_items
  has_many :file_items, serializer: FileItemSerializer
end
