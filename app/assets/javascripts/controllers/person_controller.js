App.PersonController = Ember.Controller.extend({
  modelOtherObserver: function() {
    var me = this.get('model');
    var others = [];
    if (this.get('others')) {
    	others = this.get('others').toArray();
    }

    if (!Ember.isNone(me)) {
    	var comparedStrengths = [];
    	var myOrderedStrengthIndices = me.get('orderedStrengthIndices');
    	var myStrengthIndices = me.get('strengthIndices');
    	for (var index = 0; index < window.orderedStrengths.length; index++) {
    		var mainStrengthIndex = myOrderedStrengthIndices[index]
    		var row = { strength: window.orderedStrengths[mainStrengthIndex] };
    		var thisStrengthDiffArray = [];
    		for (var otherIndex = 0; others && otherIndex < others.length; otherIndex++) {
    			var otherStrengthIndices = others[otherIndex].get('strengthIndices');
          thisStrengthDiffArray.push(myStrengthIndices[mainStrengthIndex] - otherStrengthIndices[mainStrengthIndex]);
    		}
    		row.strengthDiffs = thisStrengthDiffArray;
    	  comparedStrengths.push(row);
    	}
    	this.set('comparedStrengths', comparedStrengths);
    }
  }.observes('model', 'others')
});