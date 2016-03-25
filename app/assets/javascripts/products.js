$(document).on("ready", function(event) {
  $("#products-container").on("submit", "#products-search", function(event) {
    event.preventDefault();
    $("#products-search .form-errors").empty();
    $.ajax({
      data: $(this).serialize(),
      dataType: "json",
      method: this.method,
      url: this.action
    }).done(function(response) {
      console.log("Products search success!", response);
      if(response.errors) {
        $("#products-search .form-errors").empty();
        response.errors.forEach(function(error) {
          $("#products-search .form-errors").append(error);
        });
      }
      else if(response.htmlProducts) {
        $("#products-list").empty();
        response.htmlProducts.forEach(function(product) {
          $("#products-list").append(product);
        });
      }
    }).fail(function(response) {
      console.log("Products search failure?", response);
    });
  });
})
