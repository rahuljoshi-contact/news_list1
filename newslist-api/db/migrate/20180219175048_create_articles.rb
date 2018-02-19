class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string :author
      t.string :kids
      t.string :parent
      t.string :title
      t.string :body
      t.string :tags
      t.string :article_type

      t.timestamps
    end
  end
end
