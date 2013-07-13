// 3.js
$(function() {

  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });

  var List = Backbone.Collection.extend({
    model:  Item
  });

  var ListView = Backbone.View.extend({
    el: $('body'),

    events: {
      // id='add'のボタンをクリックしたら、addItem関数を呼び出す
      'click button#add': 'addItem'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'addItem', 'appendItem');

      // コレクションのaddイベントをappendItemメソッドにバインドする
      this.collection = new List();
      this.collection.bind('add', this.appendItem);

      this.counter = 0;
      this.render();
    },

    render: function() {
      $(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<ul></ul>");
      // 以下の部分は、最初にitemが存在した場合の処理。無くてもよい。
      _(this.collection.models).each(function(item) {
        appendItem(item);
      }, this);
    },

    addItem: function() {
      this.counter++;
      var item = new Item();
      item.set({
        part2: item.get('part2') + this.counter
      });
      this.collection.add(item);
    },

    appendItem: function(item) {
      $('ul', this.el)
        .append("<li>"+item.get('part1')+" "+item.get('part2')+"</li>");
    }
  });

  var listView = new ListView();
});
