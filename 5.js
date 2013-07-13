// 5.js
$(function() {

  // Persistence storageをダミー関数でオーバーライドする。
  // これによって、Model.destroy()がエラーにならずに実行できる。
  Backbone.sync = function(method, model, success, error) {
    success();
  }

  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });

  var List = Backbone.Collection.extend({
    model:  Item
  });

  var ItemView = Backbone.View.extend({
    tagName: 'li',

    // ItemViewが、swapとdeleteのクリックを扱えるようにする
    events: {
      'click span.swap':   'swap',
      'click span.delete': 'remove'
    },

    // change, removeイベントを、render、unrenderメソッドにバインドする
    initialize: function() {
      _.bindAll(this, 'render', 'unrender', 'swap', 'remove');

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function() {
      // [swap], [delete]ボタンも表示する
      $(this.el).html('<span style="color:black;">'
                      +this.model.get('part1')+' '
                      +this.model.get('part2')
                      +'</span>&nbsp;&nbsp;<span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span>'
                      +'</span>&nbsp;&nbsp;<span class="delete" style="font-family:sans-serif; color:red; cursor:pointer;">[delete]</span>');
      return this;
    },

    unrender: function() {
      $(this.el).remove();
    },

    swap: function() {
      var swapped = {
        part1: this.model.get('part2'),
        part2: this.model.get('part1')
      };
      this.model.set(swapped);
    },

    remove: function() {
      this.model.destroy();
    }
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
      var itemView = new ItemView({
        model: item
      });
      $('ul', this.el).append(itemView.render().el);
    }
  });

  var listView = new ListView();
});
