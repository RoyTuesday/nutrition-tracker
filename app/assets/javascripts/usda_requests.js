$(document).ready(function() {
  $("#ndb-search-results").on("click", "a.food-item", function(event) {
    event.preventDefault();
    var productData = {
      name: this.dataset["name"],
      category: this.dataset["category"],
      ndb_no: this.dataset["ndbNo"]
    }
    var link = this;
    $.ajax({
      data: productData,
      dataType: "json",
      method: "GET",
      url: link.href
    }).done(function(response) {
      $("#usda-new-product-container").html(response.html);
      $("#products-container").hide();
      $("#usda-ndb-search-container").hide();
    }).fail(function(response) {
      console.log("Search result link failure?", response);
    });
  });

  $("#usda-new-product-container").on("submit", "#new_product", function(event) {
    event.preventDefault();
    var form = this;
    $.ajax({
      data: $(form).serialize(),
      dataType: 'json',
      method: form.method,
      url: form.action
    }).done(function(response) {
      $("#usda-new-product-container").empty();
      $("#products-container").show();
      $("#products-list").append(response.product);
      $("#food-item-" + response.productNdbNo).remove();
      $("#usda-ndb-search-container").show();
    }).fail(function(response) {
      console.log("New product failure?", response);
    });
  });
});
