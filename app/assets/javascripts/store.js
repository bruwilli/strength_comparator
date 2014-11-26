App.ApplicationStore = DS.Store.extend({

})

App.ApplicationAdapter = DS.ActiveModelAdapter.extend({
	appendQueryParam: function(url, name, value) {
    if (url.indexOf('?') != -1) {
    	return url + '&' + name + '=' + value;
    } else {
    	return url + '?' + name + '=' + value;
    }
	},
  buildURL: function (type, id, record) {
  	var url = this._super(type, id, record);
    return this.appendQueryParam(url, 'authenticity_token', window.authenticityToken);
  }
})
