
/* eslint-disable no-unused-vars */

import item from './item.js';


const items = [];
let hideCheckeditems = false;

const findById = function (id) {
  return this.items.find(item => item.id === id);
};

const addItem = function (name) {
  try {
    item.validateName(name);
    this.items.push(item.create(name));
  } catch (error) {
    console.log(error.message);
  }
};

const findAndToggleChecked = function (id) {
  const item = this.findById(id);
  item.checked = !item.checked;
};

const findAndUpdateName = function (id, newName) {
  try {
    item.validateName(newName);
    const currentItem = this.findById(id);
    currentItem.name = newName;
  } catch (error) {
    console.log('Cannot update name: ' + error.message);
  }
};

const findAndDelete = (id) =>{
 let index = items.findIndex(item=> item.id === id);
  items.splice(index,1);
}

const toggleCheckedFilter = function () {
  this.hideCheckedItems = !this.hideCheckedItems;
};

export default {
  items, 
  hideCheckeditems,
  findById,
  addItem,
  findAndToggleChecked,
  findAndUpdateName,
  findAndDelete,
  toggleCheckedFilter
};