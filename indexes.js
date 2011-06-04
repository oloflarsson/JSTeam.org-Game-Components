(function($){
	
/*
 * This class maintains indexes over the keys and values in a "indexee" object.
 * If you find yourself filtering out certain items/values from an object very often
 * you could use this indexer to do that filter "once and for all".
 * 
 * The downside is that you must trigger the update events when the indexee is modified.
 * 
 * Note that you must manually call updateIndex if you add an new index.
 */
JST.Indexes = Class.extend({
	init: function(indexee) {
		this.indexee = indexee;
		this.indexes = {}; // index name -> filtered object
		this.filters = {}; // index name -> filter callback
	},
	add: function(name, filter) {
		this.indexes[name] = {};
		this.filters[name] = filter;
	},
	remove: function(name) {
		delete this.indexes[name];
		delete this.filters[name];
	},
	get: function(name) {
		return this.indexes[name];
	},
	updateItemIndex: function(id, name) {
		if (typeof this.indexee[id] !== "undefined" && this.filters[name](id, this.indexee[id])) {
			// the item passed the index filter test. Add item to the index.
			this.indexes[name][id] = this.indexee[id];
		} else {
			// the item failed the index filter test. Remove item from the index.
			delete this.indexes[name][id];
		}
	},
	updateIndexItem: function(name, id) {
		this.updateItemIndex(id, name);
	},
	updateItem: function(id) {
		for (var name in this.indexes) {
			this.updateItemIndex(id, name);
		}
	},
	updateIndex: function(name) {
		for (var id in this.indexee) {
			this.updateItemIndex(id, name);
		}
	},
	update: function() {
		for (var name in this.indexes) {
			this.updateIndex(name);
		}
	}
});
	
})(jQuery);