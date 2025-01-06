# frozen_string_literal: true

class FileItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :content, :parent_id, :children
  has_many :children, serializer: FileItemSerializer
end
