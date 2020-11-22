/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import shoppinglist from './shopping-list.js'

const main = function(){
  shoppinglist.bindEventListener();
  shoppinglist.render();
}

$(main);
