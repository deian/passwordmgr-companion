"use strict";

self.on("click", function (node, strData) {

  console.log("strData: "+strData);

  var data = JSON.parse(strData);

  var user = document.getElementById(data.usernameField);
  var pass = document.getElementById(data.passwordField);
  if (user) { user.value = data.username; }
  if (pass) { pass.value = data.password; }


  return true;
});
