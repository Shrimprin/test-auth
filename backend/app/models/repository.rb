# frozen_string_literal: true

class Repository < ApplicationRecord
  validates :name, presence: true
  validates :url, presence: true

  belongs_to :user
  has_many :file_items, dependent: :destroy

  def save_with_file_items(client)
    transaction do
      save && save_file_items(client)
    end
  end

  private

  def save_file_items(client, parent_file_item = nil, file_path = '')
    files = client.contents(url, path: file_path)
    files.each do |file|
      file_item_scope = parent_file_item ? parent_file_item.children : FileItem
      file_name = file[:name]
      file_type = file[:type]

      if file_type == 'dir'
        file_item = file_item_scope.create!(repository: self, name: file_name, type: file_type, content: nil)
        save_file_items(client, file_item, file[:path])
      else
        file_content = client.contents(url, path: file[:path])[:content]
        decoded_file_content = Base64.decode64(file_content).force_encoding('UTF-8')

        # UTF-8エンコーディングの確認と修正
        unless decoded_file_content.valid_encoding?
          decoded_file_content = decoded_file_content.encode('UTF-8', invalid: :replace, undef: :replace, replace: '')
        end

        file_item_scope.create!(repository: self, name: file_name, type: file_type, content: decoded_file_content)
      end
    end
  end
end
