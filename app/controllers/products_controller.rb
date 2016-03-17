class ProductsController < ApplicationController
  def index
    @products = Product.all
  end

  def ndb_search
    if request.xhr?
      render json: {status: 200}
    end
  end
end
