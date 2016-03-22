$(document).ready(function() {
  $("#session-links").on("click", "#login-link, #register-link", function(event) {
    event.preventDefault();
    if(event.target.id == "login-link") {
      $("#register-container").hide();
      $("#login-container").toggle();
    }
    else if(event.target.id == "register-link") {
      $("#login-container").hide();
      $("#register-container").toggle();
    }
  });

  $("nav").on("submit", "form", function(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var formName = form.parentNode.id == "login-container" ? "login" : "register";
    $.ajax({
      data: $(form).serialize(),
      dataType: "json",
      method: form.method,
      url: form.action
    }).done(function(response) {
      console.log("sessions/create success!", response);
      if(response.formWithErrors) {
        $("#" + formName + "-container").html(response.formWithErrors);
      }
      else if(response.userNav) {
        $("#login-container").empty();
        $("#register-container").empty();
        $("#session-links").html(response.userNav);
        $("#usda-ndb-search-container").html(response.usdaNdbSearch);
      }
    }).fail(function(response) {
      console.log("sessions/create failure?", response);
    });
  });
});
