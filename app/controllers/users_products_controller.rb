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

  def create
    product = Product.find_by(id: params[:product_id])
    users_product = UsersProduct.new(users_product_params)
    users_product.product = product
    users_product.user = User.find_by(id: session[:user_id])
    if request.xhr?
      if users_product.save
        render json: {success: true, users_product: users_product}
      else
        render json: {success: false}
      end
    end
  end

  private

  def users_product_params
    params.require(:users_product).permit(:servings, :date_eaten, :price)
  end
end
