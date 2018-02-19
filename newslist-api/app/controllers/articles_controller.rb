class ArticlesController < ApplicationController
	def index
	  @articles = Article.all
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
      params.require(:article).permit(:title, :body, :tags, :author)
    end
end
