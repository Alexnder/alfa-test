(function() {
  "use strict";

  fetch('js/data.json')
    .then((response) => {
      return response.json();
    })
    .then((items) => {
      itemsHandler.init(items);

      filters.init();

      // Just to be sure what we have something to show
      do {
        filters.shuffle();
      } while (!items.filter(currentFilter.filterItem).length);

      itemsHandler.refresh();
    })
    .catch((err) => {
      console.error(err);
    });
})();