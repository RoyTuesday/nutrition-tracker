$(document).ready(function() {
  $("nav a").on("click", function(event) {
    event.preventDefault();
    $.get(event.currentTarget.href).done(function(response) {
      $("#login-container").html(response);
    }).fail(function(response) {
      console.log("sessions/new failure?", response);
    });
  });
});
