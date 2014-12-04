App.SelectPdfButtonComponent = Ember.Component.extend({
  selectedPdf: undefined,
  buttonText: function() {
    if (this.get('selectedPdf')) {
      return 'Use New Gallup "Theme Sequence Report"';
    } else {
      return 'Add Using Gallup "Theme Sequence Report"';
    }
  }.property('selectedPdf'),

  didInsertElement: function() {
    // Track when a new file is selected
    this.$('#pdf-upload-file-select').on('change', function(event) {
      this.set('selectedPdf', event.target.files[0]);
    }.bind(this));
  },

  actions: {
    selectPdf: function() {
      this.$('#pdf-upload-file-select').click();
    }
  }

});