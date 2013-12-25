# About

This extension is a very simple companion to the existing password
manager. It simply provides the user with a context menu that they can
then use to fill in a form with previously-saved credentials.  This
extension is only useful if you've set the 'signon.autofillForms'
preference to false and wish to either: i) populate a password-only
form; or ii) populate a forms with credentials different than those
already pre-filled by the website.

# How does it work?

When the 'autofillForms' pref is set to false and the current page
contains credentials that can be used to populate a form, the password
manager registers an event ("noAutofillForms" on
"passwordmgr-found-form"). Hence, we listen for the event and create a
context menu which, when clicked on, passes the credentials to a
content script. The content script, in turn, populates the
corresponding username and password input fields.

# Limitations

Currently we create a menu per form according to the form
id/name/action. If the form does not have an id, name or action we
will not create a menu for it.
