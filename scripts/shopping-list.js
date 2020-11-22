/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable indent */
import store from './store.js';
import item from './item.js';

  const generateItemElement = function (item) {
    let itemTitle = `<span class='shopping-item shopping-item__checked'>${item.name}</span>`;
    if (!item.checked) {
      itemTitle = `
       <form class="js-edit-item">
       <input type="text" class="shopping-item" value="${item.name}" placeholeder="write item name!" required />
       </form>
      `;
    }
  
    return `
      <li class='js-item-element' data-item-id='${item.id}'>
        ${itemTitle}
        <div class='shopping-item-controls'>
          <button class='shopping-item-toggle js-item-toggle'>
            <span class='button-label'>check</span>
          </button>
          <button class='shopping-item-delete js-item-delete'>
            <span class='button-label'>delete</span>
          </button>
        </div>
      </li>`;
  };
  
  const generateShoppingItemsString = function (shoppingList) {
    const items = shoppingList.map((item) => generateItemElement(item));
    return items.join('');
  };
  
  /**
   * Render the shopping list in the DOM
   */
  const render = function () {
    let items = [...store.items];
    if (store.hideCheckedItems) {
      items = items.filter(item => !item.checked);
    }
    const shoppingListItemsString = generateShoppingItemsString(items);
   $('.js-shopping-list').html(shoppingListItemsString);
  };
  
  
  const handleNewItemSubmit = function () {
    $('#js-shopping-list-form').submit(function (event) {
      event.preventDefault();
      const newItemName = $('.js-shopping-list-entry').val();
      $('.js-shopping-list-entry').val('');
      store.addItem(newItemName);
      render();
    });
  };
  
  
  const handleItemCheckClicked = function () {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.currentTarget);
      store.findAndToggleChecked(id);  
      render();
    });
  };
  
  const getItemIdFromElement = function (item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  };
  
  /**
   * Responsible for deleting a list item.
   * @param {string} id 
   */
  
  const handleDeleteItemClicked = function () {
    // Like in `handleItemCheckClicked`, 
    // we use event delegation.
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // Get the index of the item in store.items.
      const id = getItemIdFromElement(event.currentTarget);
      // Delete the item.
      store.findAndDelete(id);
      // Render the updated shopping list.
      render();
    });
  };
  
  /**
   * Places an event listener on the checkbox 
   * for hiding completed items.
   */
  const handleToggleFilterClick = function () {
    $('.js-filter-checked').click(() => {
      store.toggleCheckedFilter();
      render();
    });
  };
  
  
  
  const handleEditItemSubmit  = function() {
    $('.js-shopping-list').on('submit' , '.js-edit-item' , event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const items = $(event.currentTarget).find('.shopping-item').val();
      store.findAndUpdateName(id, items);
      render();
    });
    
  };
  /**
   * This function will be our callback when the
   * page loads. It is responsible for initially 
   * rendering the shopping list, then calling 
   * our individual functions that handle new 
   * item submission and user clicks on the 
   * "check" and "delete" buttons for individual 
   * shopping list items.
   */
  const bindEventListener = function () {
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleToggleFilterClick();
    handleEditItemSubmit();
  };
  


export default{
  render,
  bindEventListener
};