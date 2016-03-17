$(document).ready(function() {
  $("#usda-ndb-search").on("submit", function(event) {
    event.preventDefault();
    var form = this;
    $.ajax({
      data: $(form).serialize(),
      dataType: 'json',
      method: form.method,
      url: form.action
    }).done(function(response) {
      console.log("NDB search success!", response);
      $("#ndb-search-results").html(response.html);
    }).fail(function(response) {
      console.log("NDB search success!", response);
    });
  });

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
      $('main').html(response.html);
    }).fail(function(response) {
      console.log("Search result link failure?", response);
    });
  });

  $("main").on("submit", "#new_product", function(event) {
    event.preventDefault();
    var form = this;
    $.ajax({
      data: $(form).serialize(),
      dataType: 'json',
      method: form.method,
      url: form.action
    }).done(function(response) {
      $("main").html(response.html)
    }).fail(function(response) {
      console.log("New product failure?", response);
    });
  });
});
