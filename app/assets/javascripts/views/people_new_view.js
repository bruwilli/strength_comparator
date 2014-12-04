App.PeopleNewView = Ember.View.extend({
	lastIndices: [],
	currentIndicesObserver: function() {
		var current = this.get('controller.currentIndices');
		var last = this.get('lastIndices');
    if (Ember.isArray(current) && !this.arraysIdentical(current, last)) {
      this.$('#ordered-strengths').children().appendTo('#initial-strengths');
      var ordered = [];
    	for (var i = 0; i < current.length; i++) {
        ordered[current[i]] = window.orderedStrengths[i];
    	}
    	for (var i = 0; i < ordered.length; i++) {
    		this.$('#initial-strengths li:contains(' + ordered[i] + ')').appendTo('#ordered-strengths');
    	}
      this.updateController();
    }
	}.observes('controller.currentIndices'),
  didInsertElement: function() {
  	var self = this;
  	var controller = this.get('controller');
  	this.$( "#ordered-strengths" ).sortable({
      connectWith: ".connectedSortable",
      update: function(event, ui) {
      	self.updateController();
      }
    }).disableSelection();
    this.$('#ordered-strengths li, #initial-strengths li').click(function(e) {
    	var initial = self.$('#initial-strengths');
    	var ordered = self.$('#ordered-strengths');
    	var target = $(e.target);
    	if (target.parent().attr('id') === 'ordered-strengths') {
    		// move to initial
    		target.detach();
    		initial.append(e.target);
    	} else {
    		// move to ordered
    		target.detach();
    		ordered.append(e.target);
    	}
    	self.updateController();
    })

  	this.$( "#initial-strengths" ).sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
  }, 

  arraysIdentical: function(a, b) {
  	if (!Ember.isArray(a) || !Ember.isArray(b)) {
  		return false;
  	}
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
  },

  updateController: function() {
  	var controller = this.get('controller');
  	var items = this.$('#ordered-strengths li');
  	var length = items.length;
  	if (length === controller.get('initialStrengths').length) {
  		var indices = [];
      for (var i = 0; i < length; i++) {
      	var strength = $(items[i]).text();
        indices.push(window.orderedStrengths.indexOf(strength));
      }
      controller.updateManualStrengthIndices(indices);
      this.set('lastIndices', indices);
  	} else {
  		// Only really care if we have all of them
  		controller.updateManualStrengthIndices([1]);
      this.set('lastIndices', 1);
  	}
  }

});