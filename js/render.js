(function() {
  "use strict";

  const render = window.render = Object.create(null);

  render.initItemsContainer = (item) => {
    const itemsContainer = document.getElementById('items');

    // Remove children
    while (itemsContainer.firstChild) {
      itemsContainer.removeChild(itemsContainer.firstChild);
    }

    return itemsContainer;
  };

  render.createItem = (item) => {
    const itemNode = document.createElement('div');
    itemNode.className = 'item';

    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemNode.appendChild(itemImage);

    const itemTitle = document.createElement('div');
    itemTitle.className = 'item-title';
    itemTitle.textContent = item.title;
    itemNode.appendChild(itemTitle);

    const itemPrice = document.createElement('div');
    itemPrice.className = 'item-price';
    itemPrice.textContent = `${item.price} руб.`;
    itemNode.appendChild(itemPrice);

    const itemDetails = document.createElement('div');
    itemDetails.className = 'item-details';
    itemDetails.innerHTML = `Размеры: ${item.sizes.join(', ')}<br>`;
    itemDetails.innerHTML += `Цвета: ${item.colors.join(', ')}<br>`;
    itemDetails.innerHTML += `<a target="_blank" href="${item.link}">Купить</a>`;
    itemDetails.display = 'none';
    itemNode.appendChild(itemDetails);

    return itemNode;
  };

  render.createFilterContainer = (name) => {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter';

    const filterLabel = document.createElement('label');
    filterLabel.textContent = name;
    filterContainer.appendChild(filterLabel);

    return filterContainer;
  };

  render.createFilterVariant = (name, value, onChange) => {
    const listNode = document.createElement('li');
    const id = `${name}-${value}`;

    // checkbox
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = `${name}[]`;
    input.value = value;
    input.id = id;
    input.onchange = onChange;
    listNode.appendChild(input);

    // title
    const label = document.createElement('label');
    label.textContent = value;
    label.htmlFor = id;
    listNode.appendChild(label);

    return listNode;
  };

  function appendPriceFilterPart(container, name, part, value, onChange) {
    const block = document.createElement('div');
    block.className = 'price-block';

    // title
    const label = document.createElement('label');
    label.textContent = part;
    label.htmlFor = `${name}-${part}`;
    block.appendChild(label);

    // input
    const input = document.createElement('input');
    input.type = 'number';
    input.id = `${name}-${part}`;
    input.name = `${name}-${part}`;
    input.value = value;
    input.onchange = onChange;
    block.appendChild(input);

    container.appendChild(block);
  };

  render.createPriceFilter = (name, min, max, onChange) => {
    const priceFilter = document.createElement('div');

    appendPriceFilterPart(priceFilter, name, 'min', min, onChange);
    appendPriceFilterPart(priceFilter, name, 'max', max, onChange);

    return priceFilter;
  };

})();