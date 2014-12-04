App.IndexRoute = Ember.Route.extend({
  redirect: function() {
   this.transitionTo('people'); 
  }
});

App.Router.reopen({
  rootURL: '/strengths/'
});

App.Router.map(function(){
	this.resource('people', { path: '/people' }, function() {
    this.route('new');
  });
  this.resource('person', { path: '/person/:person_id' }, function() {
    this.route('edit');
  });
});


