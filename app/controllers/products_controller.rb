class ProductsController < ApplicationController
  SEARCH_URI = "http://api.nal.usda.gov/ndb/search"
  API_KEY = ENV["USDA_FOOD_API_KEY"]

  def index
    @products = Product.all
  end

  def ndb_search
    if request.xhr?
      response = HTTP.get("#{SEARCH_URI}/?format=json", params: {
        q: params[:search_terms],
        api_key: API_KEY
      })
      render json: {status: 200, response: response.parse}
    end
  end
end
