(function() {
  "use strict";

  const itemsHandler = window.itemsHandler = Object.create(null);

  let items;

  itemsHandler.init = (_items) => {
    items = _items;
  };

  itemsHandler.all = () => {
    if (!items) {
      return [];
    }

    return items;
  };

  itemsHandler.refresh = () => {
    const itemsContainer = render.initItemsContainer();

    items
      .filter(currentFilter.filterItem)
      .forEach(item => itemsContainer.appendChild(render.createItem(item)));
  };
})();