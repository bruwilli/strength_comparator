App.PersonRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		var self = this;
		this.store.find('person').then(function() {
			self.store.filter('person', function(person) {
				return person.id != model.id;
			}).then(function(others) {
				controller.set('others', others);
			});
		})
		this._super(controller, model);
	},
	actions: {
    willTransition: function(transition) {
      this.controller.set('others', []);
    }
  }
});