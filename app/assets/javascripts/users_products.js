$(document).ready(function() {
  $("#products-list").on("click", "a.product", function(event) {
    event.preventDefault();
    $.ajax({
      dataType: "json",
      url: this.href
    }).done(function(response) {
      console.log("Users product form success!", response);
    }).fail(function(response) {
      console.log("Users product form failure?", response);
    });
  });
});
