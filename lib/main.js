"use strict";
var _self = require("sdk/self");
var pwd = require("sdk/passwords");
var cm = require("sdk/context-menu");
var events = require("sdk/system/events");
var URL = require("sdk/url");

var menu = cm.Menu({
  label: "Fill credentials",
  context: cm.SelectorContext("form > input[type=password], input"),
  contentScriptFile: _self.data.url("main.js"),
  items: [cm.Item({label: "No credentials", data:""})],
  onMessage: function(data) {
    menu.items.forEach(function(item) { item.destroy(); });

    if(data.url)  {
      menu.label = "Fill credentials";
      var url = URL.URL(data.url);
      data.url = url.scheme + "://" + url.host + (url.port?(":"+url.port):"");

      data.onComplete = function(credentials) {
        credentials.forEach(function(credential) {
          menu.addItem(cm.Item({ label:credential.username,
            data: JSON.stringify(credential) }));
        });

      };
      pwd.search(data);
    } else {
      menu.label = "";
    }
  }
});

