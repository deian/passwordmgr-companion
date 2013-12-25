"use strict";
var _self = require("sdk/self");
var pwd = require("sdk/passwords");
var cm = require("sdk/context-menu");
var events = require("sdk/system/events");

var menu = [];

function mkMenu(form, credentials) {

  // only handling forms with id's
  if (!form.id && !form.name && !form.formSubmitURL) { return; }

  if (!menu[form.hostname]) { // don't have menu, create it
    var ctx = form.id? 'form[id="'+form.id+'"]'
            : form.name? 'form[name="'+form.name+'"]'
            : 'form[action="'+form.formSubmitURL+'"]';
    menu[form.hostname] = cm.Menu({
      label: "Fill credentials",
      context: cm.SelectorContext(ctx),
      contentScriptFile: _self.data.url("main.js"),
    });
  }

  menu[form.hostname].items.forEach(function(item) { item.destroy(); });

  credentials.forEach(function(credential) {
    menu[form.hostname].addItem(cm.Item({
      label:credential.username,
      data: JSON.stringify(credential)
    }));
  });

}

function listener(event) {
  if (event.data !== "noAutofillForms") { return; }

  var form = event.subject;

  var search = { url: form.baseURI, 
                 onComplete: function(credentials) {
                   mkMenu(form, credentials);
                 }
               };
  if (form.action) { search.formSubmitURL=form.action; }
  pwd.search(search);


}
 
events.on("passwordmgr-found-form", listener);
