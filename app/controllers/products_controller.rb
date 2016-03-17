class ProductsController < ApplicationController
  SEARCH_URI = "http://api.nal.usda.gov/ndb/search"
  REPORT_URI = "http://api.nal.usda.gov/ndb/reports"
  API_KEY = ENV["USDA_FOOD_API_KEY"]

  def index
    @products = Product.all
  end

  def new
    @product = Product.find_by(ndb_no: params[:ndb_no])
    if @product
      render json: {found: true, html: @product[:name]}
    else
      render json: {found: false, html: render_to_string(
        "_form",
        layout: false,
        locals: {
          product: Product.new,
          name: params[:name],
          category: params[:category],
          ndb_no: params[:ndb_no]
        }
      )}
    end
  end

  def create
    if request.xhr?
      product = Product.new(product_params)
      if product.save
        response = HTTP.get("#{REPORT_URI}/?format=json", params: {
          ndbno: product_params[:ndb_no],
          api_key: API_KEY
        })
        nutrients = response.parse["report"]["food"]["nutrients"]
        nutrients.each do |nutrient|
          current_nutrient = Nutrient.find_by(name: nutrient["name"])
          unless current_nutrient
            current_nutrient = Nutrient.create({
              name: nutrient["name"],
              category: nutrient["group"],
              unit_of_measure: nutrient["unit"]
            })
          end
          ProductsNutrient.create({
            product: product,
            nutrient: current_nutrient,
            quantity: nutrient["value"]
          })
        end
        @products = Product.all
        render json: {html: render_to_string(
          "index",
          layout: false,
        )}
      else
        render json: {response: product.errors.full_messages}, status: 500
      end
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

  private

  def product_params
    params.require(:product).permit(:name, :category, :serving_size, :serving_unit, :ndb_no)
  end
end
