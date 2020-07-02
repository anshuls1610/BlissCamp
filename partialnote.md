Note about YelpCamp: Layout
Hi Everyone,
Please read the following note carefully so that you may continue the course without issue:

In the next lecture you will be exposed to the following syntax for including partials in your EJS view:

<% include partials/header %>
<% include partials/footer %>
EJS has recently been updated to v3.0.1 and now uses the following syntax:

<%- include("partials/header") %>
<%- include("partials/footer") %>
You can check your EJS version in your project's package.json file and update it, if need be, to v3.0.1, by running the following command in your terminal: npm i -S ejs

Please let us know if you have any questions.

Thank you,
Ian