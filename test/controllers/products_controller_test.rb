require 'test_helper'

class ProductsControllerTest < ActionController::TestCase
  test "Should get index" do
    get :index
    assert_response :success
  end
end
