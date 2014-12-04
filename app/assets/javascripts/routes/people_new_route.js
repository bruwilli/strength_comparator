App.PeopleNewRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		this._super(controller, model);
		controller.initPerson();
	},
	actions: {
  	willTransition: function() {
      this.get('controller').cleanup();
  	}
	}
});