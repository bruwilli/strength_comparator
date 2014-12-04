var attr = DS.attr;

App.PersonModel = DS.Model.extend({
  firstName: attr(),
  lastName: attr(),
  strengthIndices: attr(),
  isDataValid: function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');
    var strengthIndices = this.get('strengthIndices');
    return !Ember.isBlank(firstName) &&
           !Ember.isBlank(lastName) &&
           Ember.isArray(strengthIndices) && 
           strengthIndices.length === window.orderedStrengths.length;
  }.property('firstName', 'lastName', 'strengthIndices'),

  comparedToOther: function(other) {
  	myIndices = this.get('strengthIndices');
  	otherIndices = other.get('strengthIndices');

  	length = myIndices.length;
  	diffs = [];
  	var sum = 0;
  	for (var i = 0; i < length; i++) {
  		var diff = myIndices[i] - otherIndices[i];
      diffs.push(diff);
      sum += Math.abs(diff);
  	}
  	return { other: other, indexDiffs: diffs, diffness: sum };
  },

  strengthIndicesObserver: function() {
    var strengthIndices = this.get('strengthIndices');
    var orderedStrengthIndices = [];
    if (Ember.isArray(strengthIndices)) {
      for (var i = 0; i < strengthIndices.length; i++) {
        orderedStrengthIndices[strengthIndices[i]] = i;
      }
    }
    this.set('orderedStrengthIndices', orderedStrengthIndices);
  }.observes('strengthIndices').on('init')

});