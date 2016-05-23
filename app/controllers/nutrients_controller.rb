class NutrientsController < ApplicationController
  def totals
    nutrient_totals = Nutrient.joins(products_nutrients: {product: :users_products})
      .where("users_products.user_id" => session[:user_id], "users_products.date_eaten" => date_range)
      .group("nutrients.name, nutrients.unit_of_measure")
      .pluck("nutrients.name, sum(products_nutrients.quantity), nutrients.unit_of_measure")

    if request.xhr?
      render json: nutrient_totals
    end
  end

  private

  def date_range
    if params[:start_date].length > 0
      start_date = params[:start_date].to_date
      if params[:end_date].length > 0
        end_date = params[:end_date].to_date
        return start_date..end_date
      else
        return start_date..start_date
      end
    else
      return Date.new(0)..Date.today
    end
  end
end
