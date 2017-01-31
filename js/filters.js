(function() {
  "use strict";

  const filters = window.filters = Object.create(null);

  const _filters = {
    sizes: [],
    colors: [],
    price: { min: Infinity, max: -Infinity },
  };

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function fillFilterPossibleValuesFromArray(name, values) {
    values.forEach((itemFilterValue) => {
      if (!_filters[name]) {
        _filters[name] = [];
      }

      const filter = _filters[name];
      if (filter.indexOf(itemFilterValue) === -1) {
        filter.push(itemFilterValue);
      }
    });
  }

  function fillFilterPossiblePrice(value) {
    if (value < _filters.price.min) {
      _filters.price.min = value;
    } else if (value > _filters.price.max) {
      _filters.price.max = value;
    }
  }

  function fillFilterPossibleValues() {
    itemsHandler.all().forEach((item) => {
      Object.keys(_filters).forEach((filterName) => {

        if (!item[filterName]) {
          console.error(`prepareFilters: '${filterName}'' not found at item`, item);
          return;
        }

        const itemFilterValue = item[filterName];

        if (itemFilterValue instanceof Array) {
          fillFilterPossibleValuesFromArray(filterName, itemFilterValue);
        }

        if (filterName == 'price') {
          fillFilterPossiblePrice(itemFilterValue);
        }
      });
    });

    return _filters;
  };

  function createFilterForArray(name, values) {
    const container = document.createElement('ul');

    values.forEach((value, index) => {
      const listNode = render.createFilterVariant(name, value, () => {
        currentFilter.updateFromArrayByName(name);
        itemsHandler.refresh();
      });

      container.appendChild(listNode);
    });

    return container;
  }

  function createPriceFilter() {
    return render.createPriceFilter(
      'price',
      _filters.price.min,
      _filters.price.max,
      () => {
        currentFilter.updateFromPrice('price');
        itemsHandler.refresh();
      }
    );
  }

  filters.shuffle = () => {
    document
      .getElementById('filter')
      .querySelectorAll('[type="checkbox"]')
      .forEach((checkbox) => {
        if (Math.random() > 0.9) {
          checkbox.checked = true;
          currentFilter.setArrayValue(
            checkbox.name.replace('[]', ''),
            checkbox.value
          );
        }
      });

    document
      .getElementById('filter')
      .querySelectorAll('[type="number"]')
      .forEach((input) => {
        if (Math.random() > 0.5) {
          const newValue = randomIntFromInterval(
            _filters.price.min,
            _filters.price.max
          );
          input.value = newValue;
          currentFilter.setPriceValue(input.name.match(/-(\w+)$/)[1], newValue);
        }
      });
  };

  filters.init = () => {
    fillFilterPossibleValues();

    const filtersContainer = document.getElementById('filter');

    Object.keys(_filters).forEach((filterName) => {
      const filter = _filters[filterName];

      let filterNode;
      if (filter instanceof Array) {
        filterNode = createFilterForArray(filterName, filter);
      }
      if (filterName === 'price') {
        filterNode = createPriceFilter();
      }

      if (!filterNode) {
        console.warn(`filters.init: ${filterName} haven't values`);
        return;
      }

      const filterContainer = render.createFilterContainer(filterName);
      filterContainer.appendChild(filterNode);
      filtersContainer.appendChild(filterContainer);
    });
  }

})();