App.PersonView = Ember.View.extend({
  didInsertElement: function() {
  	$('.person-table').dragtable()
  }
});