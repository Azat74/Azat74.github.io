'use strict';

console.log(photos);

Vue.component('gallery__item', {
  data: function () {
    return {
      checked: false,
      staticid: 0
    }
  },
  props: ['alt', 'item', 'key2'],
  methods: {
    check: function () {
      this.checked = !this.checked
      this.$emit('check')
    },
    uncheck: function () {
      this.checked = !this.checked
      this.$emit('uncheck')
    },
    delete1: function (id) {
      if (this.checked == true) {
        this.checked = false;
        this.$emit('uncheck')
      }
      Vue.delete(this.$root.$data.db, id);
    },
    thissure: function () {
      console.log('thissure');
    },
    deletetest: function () {
      console.log('call');
    }

  },
  template:
    '\
    \
    <div v-if="checked" class="gallery__item gallery__item_checked">\
    <div class="gallery__img" >\
    <img :alt="alt" :src="item.sample_url">\
    <div class="gallery__actions">\
      <div class="gallery__action-buttons">\
        <i v-if="checked" v-on:click="uncheck" class="material-icons gallery__checked">check_circle</i>\
        <div v-else v-on:click="check" class="gallery__check-none"></div>\
        <div class="gallery__file-actions">\
          <i class="material-icons share">share</i>\
          <i v-on:click="delete1(key2)" class="material-icons delete">delete</i>\
          <i class="material-icons download">file_download</i>\
        </div>\
      </div>\
      <div class="gallery__view view">\
        <i class="material-icons">visibility</i>\
      </div>\
    </div>\
  </div>\
  <div class="gallery__option-block">\
    <div class="gallery__option-img">?</div>\
    <div class="gallery__option">\
      <select>\
        <option>Выбор 1</option>\
        <option>Выбор 2</option>\
        <option>Выбор 3</option>\
      </select>\
    </div>\
    <i class="material-icons pay">credit_card</i>\
  </div>\
  </div>\
</div>\
    <div v-else class="gallery__item">\
    <div class="gallery__img" >\
    <img :alt="alt" :src="item.sample_url">\
    <div class="gallery__actions">\
      <div class="gallery__action-buttons">\
        <i v-if="checked" v-on:click="uncheck" class="material-icons gallery__checked">check_circle</i>\
        <div v-else v-on:click="check" class="gallery__check-none"></div>\
        <div class="gallery__file-actions">\
          <i class="material-icons share">share</i>\
          <i v-on:click="delete1(key2)" class="material-icons delete">delete</i>\
          <i class="material-icons download">file_download</i>\
        </div>\
      </div>\
      <div class="gallery__view view">\
        <i class="material-icons">visibility</i>\
      </div>\
    </div>\
  </div>\
  <div class="gallery__option-block">\
    <div class="gallery__option-img">?</div>\
    <div class="gallery__option">\
      <select>\
        <option>Выбор 1</option>\
        <option>Выбор 2</option>\
        <option>Выбор 3</option>\
      </select>\
    </div>\
    <i class="material-icons pay">credit_card</i>\
  </div>\
  </div>\
</div>\
    \
    '
})

Vue.component('gallery__count-title', {
  props: ['length'],
  data: function () {
    return {
    }
  },
  template: '<div class="gallery__count-title"><span>{{ length }}</span> изображений</div>'
})

Vue.component('gallery__pagination', {
  template: '\
    <div class="gallery__pagination">\
    <div class="gallery__pages">\
      <div class="gallery__page gallery__page_active">1</div>\
      <div class="gallery__page">2</div>\
    </div>\
    <div class="gallery__next-page">></div>\
  </div>\
  '
})

Vue.component('gallery__count-number', {
  props: ['checks'],
  template: '<div class="gallery__count-number">{{ checks }}</div>'
})

Vue.component('gallery__menu', {
  props: ['checks'],
  methods: {
    checksall: function () {
      this.$emit('checksall')
    },
    deleteselected: function () {
      this.$emit('deleteselected')
    }
  },
  template: '\
    <div class="gallery__menu" >\
      <div class="wrapper" >\
        <div class="gallery__menu-content">\
          <div class="gallery__count-container">\
            <i v-on:click="checksall" class="material-icons gallery__count-minus">remove_circle_outline</i>\
            <gallery__count-number :checks="checks"></gallery__count-number>\
            <div class="gallery__count-label">изображение выбрано</div>\
          </div>\
          <div class="gallery__all-actions">\
            <i v-on:click="deleteselected" class="material-icons delete-selected">delete</i>\
            <i class="material-icons archive-selected">archive</i>\
            <i class="material-icons credit-selected">credit_card</i>\
            <i class="material-icons add-selected">add_box</i>\
          </div>\
          <div class="gallery__cancel">Для отмены нажмите ESC</div>\
        </div>\
      </div>\
    </div>'
})

new Vue({
  el: '#app',
  data: {
    db: photos,
    text: 'test',
    checks: 0
  },
  methods: {
    checkplus: function () {
      this.checks += 1;
    },
    checkminus: function () {
      this.checks -= 1;
    },
    allchecks: function () {
      console.log(this.$root.$data.db);
      let count = 0;
      this.$children.forEach(function (item) {
        if (item.$el.className != 'gallery__item gallery__item_checked' && item.$el.className == 'gallery__item') {
          console.log(item.$el.className);
          item.check();
          count += 1;
        }
      });
      if (count == 0) {
        this.$children.forEach(function (item) {
          if (item.$el.className == 'gallery__item gallery__item_checked') {
            item.uncheck();
          }
        })
      }
    },
    deleteitems: function () {
      this.$children.forEach(function (item, i, arr) {
        if (item.checked == true && (item.$el.className == 'gallery__item' || item.$el.className == 'gallery__item gallery__item_checked')) {
          item.checked = false;
          item.$root.checkminus();
          console.log(item.$root.$data.db, item.key2);
          setTimeout(function () {
            Vue.delete(item.$root.$data.db, item.key2);
          }, 0)
        }
      });
    }
  }
})