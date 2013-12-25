"use strict";

self.on("context", function (node) {
  var data = { url: node.baseURI };
  var parent = node.parentNode;
  while (parent && node.nodeName != "FORM") { 
    node = parent;
    parent = node.parentNode; 
  }
  if (node.nodeName == "FORM") { 
    data.formSubmitURL = node.action ? node.action : node.baseURI;
    self.postMessage(data);
  }
  return true;
});

self.on("click", function (node, strData) {

  if (!strData) { return true; }

  var data = JSON.parse(strData);

  var parent = node.parentNode;
  while (parent && node.nodeName != "FORM") { 
    node = parent;
    parent = node.parentNode; 
  }
  node = (node && node.nodeName == "FORM") ? node : document;

  var user = node.querySelectorAll('input[id="'+data.usernameField+'"],'+
                                   'input[name="'+data.usernameField+'"]')[0];
  var pass = node.querySelectorAll(
    'input[type=password][id="'+data.passwordField+'"],'+
    'input[type=password][name="'+data.passwordField+'"]')[0];
  if (user) { user.value = data.username; }
  if (pass) { pass.value = data.password; }

  return true;
});
