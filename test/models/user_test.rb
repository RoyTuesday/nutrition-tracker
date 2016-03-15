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

  test "Should not save without username" do
    without_username = User.new({
      email: "email@example.com",
      password: "password"
    })
    assert_not without_username.save, "User saved without a username!"
  end

  test "Should not save if username already exists" do
    duplicate_username = User.new({
      username: "charles",
      email: "email@example.com",
      password: "password"
    })
    assert_not duplicate_username.save, "User saved despite duplicate username!"
  end

  test "Should not save if username is shorter than 6 characters" do
    short_username = User.new({
      username: "I",
      email: "email@example.com",
      password: "password"
    })
    assert_not short_username.save, "User saved with too short a password!"
  end

  test "Should not save without email" do
    without_email = User.new({
      username: "my_name",
      password: "password"
    })
    assert_not without_email.save, "User saved without an email!"
  end

  test "Should not save without password" do
    without_password = User.new({
      username: "my_name",
      email: "email@example.com"
    })
    assert_not without_password.save, "User saved without a password!"
  end
end
