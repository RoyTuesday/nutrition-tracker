$(document).ready(function() {
  $("#products-list").on("click", "a.product", function(event) {
    event.preventDefault();

    var productId = event.currentTarget.dataset["id"];
    var productForm = $("#product-" + productId + " form");
    $("#product-details-" + productId).toggle();

    if(productForm.length > 0) {
      productForm.toggle();
    }
    else {
      $.ajax({
        dataType: "json",
        url: this.href
      }).done(function(response) {
        if(response.loggedIn) {
          $("#product-" + response.product.id).append(response.form);
        }
      }).fail(function(response) {
        console.log("Users product form failure?", response);
      });
    }
  });

  $("#users-products-list").on("click", "a.users-product", function(event) {
    event.preventDefault();

    var usersProductId = event.currentTarget.dataset["id"];
    $("#users-product-details-" + usersProductId).toggle();
  })

  $("#products-list").on("submit", "form.new_users_product", function(event) {
    event.preventDefault();
    $.ajax({
      data: $(this).serialize(),
      dataType: "json",
      method: this.method,
      url: this.action
    }).done(function(response) {
      var form = $("#product-" + response.productId + " form");
      console.log("Users product create success!", response);
      if(response.success) {
        form.hide();
      }
      else {
        var formErrors = $("#product-" + response.productId + "-users-product-errors")
        formErrors.html(response.errors);
      }
    }).fail(function(response) {
      console.log("Users product create failure?", response);
      $('body').html(response["responseText"]);
    });
  });
});