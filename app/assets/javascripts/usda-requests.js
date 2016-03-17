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
    var link = this;
    $.ajax({
      data: {ndb_no: link.dataset.ndbNumber},
      dataType: "json",
      method: "GET",
      url: link.href
    }).done(function(response) {
      console.log("Search result link success!", response);
    }).fail(function(response) {
      console.log("Search result link failure?", response);
    });
  });
});
