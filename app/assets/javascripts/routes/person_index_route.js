App.PeopleNewRoute = Ember.Route.extend({
	model: function(params) {
		var people = this.store.all('person');
		var self = this;
		if (people.length <= 1) {
			return this.store.find('person').then(function(all) {
				return self.splitPeople(params.id, all);
			}, function(reason) {
				return null;
			});
		} else {
			return self.splitPeople(params.id, people);
		}
	},
	splitPeople: function(id, people) {
		var peopleArray = people.getArray();
		var i = 0;
		for(; i < peopleArray.length; i++) {
			if (peopleArray[i].id == id) {
				var me = peopleArray.splice(i, 1);
				return { me: me, others: peopleArray };
			}
		}
		return null;
	}

});