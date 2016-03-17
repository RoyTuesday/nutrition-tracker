class ProductsController < ApplicationController
  SEARCH_URI = "http://api.nal.usda.gov/ndb/search"
  API_KEY = ENV["USDA_FOOD_API_KEY"]

  def index
    @products = Product.all
  end

  def new
    @product = Product.find_by(ndb_no: params[:ndb_no])
    if @product
      render json: {found: true, product: @product}
    else
      render json: {found: false}
    end
  end

  def ndb_search
    if request.xhr?
      response = HTTP.get("#{SEARCH_URI}/?format=json", params: {
        q: params[:search_terms],
        api_key: API_KEY
      })
      unless response.code >= 400
        food_items = response.parse["list"]["item"]
        render json: {status: 200, html: render_to_string(
          "_usda_search_results",
          layout: false,
          locals: {food_items: food_items}
        )}
      end
    end
  end
end
