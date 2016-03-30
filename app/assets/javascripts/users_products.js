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
    $("div#users-product-details-" + usersProductId).toggle();
  });

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

  $("a.users-product-edit-toggle").on("click", function(event) {
    event.preventDefault();
    var editContainer = $("div#users-product-" + event.target.dataset.usersProductId + "-edit");
    if(editContainer.html().length > 0) {
      editContainer.toggle();
    }
    else {
      $.ajax({
        dataType: "json",
        url: event.target.href
      }).done(function(response) {
        editContainer.html(response.form);
      }).fail(function(response) {
        console.log("UsersProduct edit failure?", response);
      });
    }
  });
  $("div.users-product-edit").on("submit", "form", function(event) {
    event.preventDefault();
    $.ajax({
      data: $(this).serialize(),
      dataType: "json",
      method: "PUT",
      url: event.target.action
    }).done(function(response) {
      if(response.errorsHtml) {
        $("form#edit_users_product_" + response.usersProductId + " div.users-product-errors-container").html(response.errorsHtml);
      }
      else {
        $("form#edit_users_product_" + response.usersProductId).hide();
        $("li#users-product-" + response.usersProductId + "-container").html(response.html);
        $("div#users-product-details-" + usersProductId).show();
      }
    }).fail(function(response) {
      console.log("Edit failure?", response);
    });
  });

  $("a.users-product-delete").on("click", function(event) {
    event.preventDefault();
    $.ajax({
      dataType: "json",
      method: "DELETE",
      url: event.target.href
    }).done(function(response) {
      $("li#users-product-" + response.usersProductId + "-container").remove();
    }).fail(function(response) {
      console.log("Users_product delete failure?", response);
    });
  });
});
