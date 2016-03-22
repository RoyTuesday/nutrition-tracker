$(document).ready(function() {
  $("#session-links").on("click", "#login-link, #register-link", function(event) {
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
        $("#login-container ul.form-errors").empty();
        response.errors.forEach(function(message) {
          $("#login-container ul.form-errors").append(message);
        })
      }
      else if(response.userNav) {
        $("#login-container").empty();
        $("#session-links").html(response.userNav);
        $("#usda-ndb-search-container").html(response.usdaNdbSearch);
      }
    }).fail(function(response) {
      console.log("sessions/create failure?", response);
    });
  });
});
