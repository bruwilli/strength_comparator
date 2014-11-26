App.PeopleNewController = Ember.Controller.extend({
  isValid: function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');
    var strengthIndices = this.get('strengthIndices');
    return !this.get('processingPdf') &&
           !Ember.isBlank(firstName) &&
           !Ember.isBlank(lastName) &&
           Ember.isArray(strengthIndices) && 
           strengthIndices.length === window.orderedStrengths.length;
  }.property('firstName', 'lastName', 'strengthIndices'),

  handleError: function(message) {
    if (!this.get('isValid')) {
      this.set('selectedPdf', null);
    }
    this.set('errorMessage', message);
    this.set('processingPdf', false);
  },

  selectedPdfObserver: function() {
    this.set('processingPdf', true);
    this.set('errorMessage', null);
    var self = this;
    var selectedPdf = this.get('selectedPdf');
    if (!Ember.isNone(selectedPdf)) {
      var reader = new FileReader();
      reader.onload = function() {
        if (reader.result.byteLength > 80000) {
          self.handleError('It does not look like the PDF you just selected was your Gallup "Theme Sequence Report"');
          return;
        }
        self.pdfToText(reader.result);
      };
      reader.readAsArrayBuffer(selectedPdf);
    }
  }.observes('selectedPdf'),
  pdfToText: function(data){   
    $('.textLayer').remove();
    var self = this;
    self.complete = 0;

    // render the first pages
    var pdf = new PDFJS.PDFDoc(data);
    var total = pdf.numPages;
    
    var canvas = document.createElement('canvas');

    canvas.width = 10;
    canvas.height = 10;
    var context = canvas.getContext('2d');

    for (i = 1; i <= total; i++){
      var page = pdf.getPage(i);
      
      var textLayer = document.createElement('div');
      textLayer.className = 'textLayer hidden';
      document.body.appendChild(textLayer);
      
      page.startRendering(context, function(){
        if (++self.complete == total){
          window.setTimeout(function(){
            var layers = [];
            var nodes = document.querySelectorAll(".textLayer > div");
            for (var j = 0; j < nodes.length; j++){
              layers.push(nodes[j].textContent.replace(/\xa0/g, ' '));
            }
            var firstName, lastName;
            try {
              if (layers[0] != "Your Theme Sequence") {
                self.handleError('It does not look like the PDF you just selected was your Gallup "Theme Sequence Report"');
                return;
              }
              var names = layers[2].split(' ');

              firstName = names[0];
              lastName = names.splice(1).join(' ');
              var strengths = [];
              for (var i = 0; i < window.orderedStrengths.length; i++) {
                var strengthPosition = layers.indexOf((i + 1) + '.') + 1;
                strengths.push(layers[strengthPosition]);
              }
            } catch (e) {
              self.handleError('It does not look like the PDF you just selected was your Gallup "Theme Sequence Report"');
              return;
            }

            var strengthIndices = [];
            var i = 0;
            for (; i < strengths.length; i++) {
              var strength = strengths[i];
              var index = window.orderedStrengths.indexOf(strength);
              if (index == -1) {
                break;
              } else {
                strengthIndices.push(index);
              }
            }

            if (i === window.orderedStrengths.length) {
              self.setProperties({
                firstName: firstName,
                lastName: lastName,
                strengthIndices: strengthIndices
              })
              self.set('processingPdf', false);
            } else {
              self.handleError('Could not find all strengths in the submitted Theme Sequence Report');
              return;
            }
          }, 1000);
        }
      }, textLayer);
    }
  },
  actions: {
    submit: function() {
      var person = this.store.createRecord('person', {
        firstName: this.get('firstName'),
        lastName: this.get('lastName'),
        strengthIndices: this.get('strengthIndices')
      });

      person.save().then(function() {
        alert("Save worked");
      }, function(error) {
        alert("Save didn't work!");
      });
    }
  }

});