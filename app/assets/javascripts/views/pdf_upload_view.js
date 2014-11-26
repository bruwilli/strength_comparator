App.PdfUploadView = Ember.TextField.extend({
	type: 'file',
	attributeBindings: ['accept', 'style'],
	accept: 'application/pdf',
	style: 'display:none;'
});