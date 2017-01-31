(function() {
  "use strict";

  const currentFilter = window.currentFilter = Object.create(null);

  const currentFilters = { price: {} };

  function isInt(value) {
    return /^\d+$/.test(value);
  }

  currentFilter.updateFromArrayByName = (name) => {
    const inputs = document.getElementsByName(`${name}[]`);
    const activeInputs = [].filter.call(inputs, (input) => input.checked)
      .map((input) => {
        if (isInt(input.value)) {
          return parseInt(input.value);
        }
        return input.value;
      });

    if (activeInputs.length) {
      currentFilters[name] = activeInputs;
    } else if (currentFilters[name]) {
      delete currentFilters[name];
    }
  }

  currentFilter.updateFromPrice = (name) => {
    const min = document.getElementById(`${name}-min`);
    const max = document.getElementById(`${name}-max`);
    currentFilters.price.min = min.value;
    currentFilters.price.max = max.value;
  }

  currentFilter.filterItem = (item) => {
    if (currentFilters.sizes) {
      if (!item.sizes.some(
        (size) => currentFilters.sizes.indexOf(parseInt(size)) !== -1
      )) {
        return false;
      }
    }
    if (currentFilters.colors) {
      if (!item.colors.some(
        (color) => currentFilters.colors.indexOf(color) !== -1
      )) {
        return false;
      }
    }
    if (currentFilters.price.min) {
      if (item.price < currentFilters.price.min) {
        return false;
      }
    }
    if (currentFilters.price.max) {
      if (item.price > currentFilters.price.max) {
        return false;
      }
    }

    return true;
  };

  currentFilter.setArrayValue = (name, value) => {
    if (!currentFilters[name]) {
      currentFilters[name] = [];
    }

    if (isInt(value)) {
      value = parseInt(value);
    }

    currentFilters[name].push(value);
  };

  currentFilter.setPriceValue = (part, value) => {
    currentFilters.price[part] = value;
  };

})();