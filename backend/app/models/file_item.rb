# frozen_string_literal: true

class FileItem < ApplicationRecord
  self.inheritance_column = nil # typeカラムを使うために単一テーブル継承を無効にする

  validates :name, presence: true
  validates :type, presence: true

  # has_closure_tree order: 'file_item_hierarchies.generations'
  has_closure_tree

  belongs_to :repository

  enum :type, { dir: 0, file: 1 }
end
