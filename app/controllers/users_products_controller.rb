class UsersProductsController < ApplicationController
  def new
    product = Product.find_by(id: params[:product_id])
    users_product = UsersProduct.new
    if request.xhr?
      if product
        render json: {
          form: render_to_string("_form", layout: false, locals: {
            product: product,
            users_product: users_product
          }),
          product: product
        }
      else
        render json: {product: product}, status: 500
      end
    end
  end
end
