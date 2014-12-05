#= require jquery
#= require jquery-ui/sortable
#= require jquery-ui/draggable
#= require ./vendor/jquery.dragtable
#= require handlebars
#= require ember
#= require ember-data
#= require_self
#= require app

window.URL = window.URL || window.webkitURL;
window.App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
});