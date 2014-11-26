var attr = DS.attr;

App.PersonModel = DS.Model.extend({
  firstName: attr(),
  lastName: attr(),
  strengthIndices: attr(),
	
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),

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
  }
});