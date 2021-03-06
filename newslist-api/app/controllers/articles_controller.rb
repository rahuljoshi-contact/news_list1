class ArticlesController < ApplicationController
	def index
	  @articles = Article.all
	  #@articles = Article.order('created_at DESC')
	  render json: @articles
	end

    def show
      @article = Article.find(params[:id])
      render json: @article
    end

    def create
      @article = Article.create(idea_params)
      render json: @article
    end
	
	def update
      @article = Article.find(params[:id])
      @article.update_attributes(idea_params)
      render json: @article
    end
    
    def destroy
      @article = Article.find(params[:id])
      if @article.destroy
        head :no_content, status: :ok
      else
        render json: @idea.errors, status: :unprocessable_entity
      end
    end

	def idea_params
      params.require(:article).permit(:title, :body, :tags, :author, :id, :created_at, :updated_at, :kids, :parent)
    end
end
