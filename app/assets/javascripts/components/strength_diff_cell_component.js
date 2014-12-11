App.StrengthDiffCellComponent = Ember.Component.extend({
  tagName: 'td',
  attributeBindings: ['style'],
  classNames: ['strength-diff-cell'],
  style: function() {
    var bc = this.colorForStrengthDiff(this.get('strengthDiff'));
    var backgroundStyle = 'background-color: rgb(' + bc.r + ',' + bc.g + ',' + bc.b + ');';
    var fc = this.invertColor(bc);
    var fontStyle = 'color: rgb(' + fc.r + ',' + fc.g + ',' + fc.b + ');';

    return backgroundStyle + fontStyle;
  }.property('strengthDiff'),
  strengthDiff: function() {
    var person = this.get('person'), 
        comparedPerson = this.get('comparedPerson');
    if (!Ember.isNone(person) && !Ember.isNone(comparedPerson)) {
      return person.comparedToOther(comparedPerson).diffness; 
    } else {
      return "";
    }
  }.property('person', 'comparedPerson'),
  absStrengthDiff: function() {
    return Math.abs(this.get('strengthDiff'));
  }.property('strengthDiff'),
  above: function() {
    return this.get('strengthDiff') > 0;
  }.property('strengthDiff'),
  below: function() {
    return this.get('strengthDiff') < 0;
  }.property('strengthDiff'),
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
      return  {r: red, g: green, b: blue};
	  	return 'rgb(' + red + ',' + green + ',' + blue + ')';       
  	}
  	return 'rgb(255,255,255)';
  },
  invertColor: function(c) {
    var color = 0xFFFFFF ^((c.r << 16) + (c.g << 8) + c.b);
    return {r: (color & 0xFF0000) >> 16, g: (color & 0xFF00) >> 8, b: color & 0xFF};
  }
});

App.StrengthDiffCellComponent.Colors = {
	sameRed: 0,
	sameGreen: 255,
  sameBlue: 0,
  diffRed: 0,
  diffGreen: 0,
  diffBlue: 255
};


