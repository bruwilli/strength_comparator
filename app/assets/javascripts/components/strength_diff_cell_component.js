App.StrengthDiffCellComponent = Ember.Component.extend({
  tagName: 'td',
  attributeBindings: ['style'],
  classNames: ['strength-diff-cell'],
  style: function() {
    return 'background-color: ' + this.colorForStrengthDiff(this.get('strengthDiff'));
  }.property('strengthDiff', 'maxDiff', 'person', 'comparedPerson'),
  strengthDiff: function() {
    var person = this.get('person'), 
        comparedPerson = this.get('comparedPerson');
    if (!Ember.isNone(person) && !Ember.isNone(comparedPerson)) {
      return person.comparedToOther(comparedPerson).diffness; 
    } else {
      return "";
    }
  }.property('person', 'comparedPerson'),
  // comparedPeopleObserver: function() {
  // 	var person = this.get('person'), 
  // 	    comparedPerson = this.get('comparedPerson');
  // 	if (!Ember.isNone(person) && !Ember.isNone(comparedPerson)) {
  // 		this.set('strengthDiff', person.comparedToOther(comparedPerson).diffness); 
  // 	}
  // }.observes('person', 'comparedPerson').on('init'),
  colorForStrengthDiff: function(diff) {
  	if (!Ember.isNone(diff)) {
	  	var absDiff = Math.abs(diff);
	  	var maxDiff = this.get('maxDiff');
	  	var colorMultiplier = absDiff / maxDiff;
	  	var red = App.StrengthDiffCellComponent.Colors.sameRed + 
	  	          colorMultiplier * (App.StrengthDiffCellComponent.Colors.diffRed - App.StrengthDiffCellComponent.Colors.sameRed);
	  	var green = App.StrengthDiffCellComponent.Colors.sameGreen + 
	  	          colorMultiplier * (App.StrengthDiffCellComponent.Colors.diffGreen - App.StrengthDiffCellComponent.Colors.sameGreen);
	  	var blue = App.StrengthDiffCellComponent.Colors.sameBlue + 
	  	          colorMultiplier * (App.StrengthDiffCellComponent.Colors.diffBlue - App.StrengthDiffCellComponent.Colors.sameBlue);
	  	red = Math.round(red);          
	  	green = Math.round(green);          
	  	blue = Math.round(blue);   
	  	return 'rgb(' + red + ',' + green + ',' + blue + ')';       
  	}
  	return 'rgb(255,255,255)';
  }

});

App.StrengthDiffCellComponent.Colors = {
	sameRed: 0,
	sameGreen: 255,
  sameBlue: 0,
  diffRed: 0,
  diffGreen: 0,
  diffBlue: 255
}