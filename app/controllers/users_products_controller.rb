class UsersProductsController < ApplicationController
  def index
    user = User.find_by(id: session[:user_id])
    users_products = UsersProduct.includes(:product).where(user: user)
    if request.xhr?
      render json: users_products.as_json(include: [:product])
    end
  end

  def new
    product = Product.find_by(id: params[:product_id])
    users_product = UsersProduct.new
    if request.xhr?
      if product and User.find_by(id: session[:user_id])
        render json: {
          form: render_to_string("_form", layout: false, locals: {
            product: product,
            users_product: users_product
          }),
          loggedIn: true,
          product: product
        }
      else
        render json: {loggedIn: false, product: product}
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
        render json: {
          success: true,
          productId: product.id
        }
      else
        errors = users_product.errors.full_messages
        render json: {
          success: false,
          productId: product.id,
          errors: render_to_string(
            "_errors",
            layout: false,
            locals: {errors: errors}
          )
        }
      end
    end
  end

  def edit
    product = Product.find_by(id: params[:product_id])
    users_product = UsersProduct.find_by(id: params[:id])
    if request.xhr?
      if product and users_product
        render json: {
          form: render_to_string("_form", layout: false, locals: {
            product: product,
            users_product: users_product
          })
        }
      else
        render json: {
          errors: ["Record(s) not found!", product, users_product]
        }
      end
    end
  end

  def update
    users_product = UsersProduct.includes(:product).find_by(id: params[:id])
    if request.xhr?
      if users_product.update_attributes(users_product_params)
        render json: users_product.as_json(include: [:product])
      else
        render json: {errors: users_product.errors.full_messages}
      end
    end
  end

  def destroy
    users_product = UsersProduct.find_by(id: params[:id])
    if request.xhr?
      if users_product.destroy
        render json: {result: "success!"}
      else
        render json: {result: "failure"}
      end
    end
  end

  private

  def users_product_params
    params.require(:users_product).permit(:servings, :date_eaten, :price)
  end
end
