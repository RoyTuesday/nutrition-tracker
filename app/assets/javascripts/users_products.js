$(document).ready(function() {
  $("#products-list").on("click", "a.product", function(event) {
    event.preventDefault();

    var productId = event.currentTarget.dataset["id"];
    var productForm = $("#product-" + productId + " form");

    if(productForm.length > 0) {
      productForm.toggle();
    }
    else {
      $.ajax({
        dataType: "json",
        url: this.href
      }).done(function(response) {
        $("#product-" + response.product.id).append(response.form);
      }).fail(function(response) {
        console.log("Users product form failure?", response);
      });
    }
  });

  $("#products-list").on("submit", "form.new_users_product", function(event) {
    event.preventDefault();
    var form = this;
    $.ajax({
      data: $(form).serialize(),
      dataType: "json",
      method: form.method,
      url: form.action
    }).done(function(response) {
      $(form).hide();
    }).fail(function(response) {
      console.log("Users product create success!", response);
    });
  });
});
