require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "Should save with valid fields" do
    user = User.new({
      username: "my_name",
      email: "email@example.com",
      password: "password"
    })
    assert user.save, "User didn't save despite valid fields!"
  end
end
