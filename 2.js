$(function() {

  var ListView = Backbone.View.extend({
    el: $('body'),

    events: {
      // id='add'のボタンをクリックしたら、addItem関数を呼び出す
      'click button#add': 'addItem'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'addItem');

      this.counter = 0;
      this.render();
    },

    render: function() {
      $(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<ul></ul>");
    },

    addItem: function() {
      this.counter++;
      $('ul', this.el).append("<li>hello world"+this.counter+"</li>");
    }
  });

  var listView = new ListView();
});
