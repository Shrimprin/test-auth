# frozen_string_literal: true

class FileItem < ApplicationRecord
  self.inheritance_column = nil # typeカラムを使うために単一テーブル継承を無効にする

  has_closure_tree

  belongs_to :repository

  enum :type, { dir: 0, file: 1 }
end
