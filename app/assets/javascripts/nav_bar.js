$(document).ready(function() {
  $("#login-link").on("click", function(event) {
    event.preventDefault();
    $.get(event.currentTarget.href).done(function(response) {
      $("#login-container").html(response);
    }).fail(function(response) {
      console.log("sessions/new failure?", response);
    });
  });

  $("#login-container").on("submit", "form", function(event) {
    event.preventDefault();
    console.log(event.currentTarget);
    var form = event.currentTarget;
    $.ajax({
      data: $(form).serialize(),
      dataType: "json",
      method: form.method,
      url: form.action
    }).done(function(response) {
      console.log("sessions/create success!", response);
      if(response.errors) {
        $("#login-errors").empty();
        response.errors.forEach(function(message) {
          $("#login-errors").append(message);
        })
      }
      else if(response.userNav) {
        $("#login-container").empty();
        $("nav").html(response.userNav);
      }
    }).fail(function(response) {
      console.log("sessions/create failure?", response);
    });
  });
});
