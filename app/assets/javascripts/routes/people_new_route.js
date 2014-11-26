App.PeopleNewRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		controller.setProperties({
			firstName: '',
			lastName: '',
			strengthIndices: [],
			selectedPdf: null
		});
	}
});