// First part link
location.href = 'http://www.vse-noski.ru/collection/Muzhskie-noski';

// Second part link
location.href = 'http://www.vse-noski.ru/collection/Muzhskie-noski?page=2';

// Script to parse data
JSON.stringify([].map.call(document.querySelectorAll('.box_item'), (item) => ({
  link: item.querySelector('a').href,
  image: item.querySelector('.img-container img').src,
  title: item.querySelector('.img-container img').title,
  price: parseInt(item.querySelector('.normalprice').textContent.match(/(\d+)/)[1]),
  sizes: [].map.call(item.querySelectorAll('.variant-select-option-0 span'), (span) => parseInt(span.textContent)),
  colors: [].map.call(item.querySelectorAll('.variant-select-option-1 img'), (img) => decodeURIComponent(img.src).match(/\/([^/]+)\.jpg$/)[1]),
})));