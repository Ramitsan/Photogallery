'use strict';

var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

//изменение увеличенного изображения и его названия
function setDetails(imageUrl, titleText) {
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

//получаем URL изображения из миниатюры 
function imageFromThumb(thumbnail) {
  return thumbnail.getAttribute('data-image-url');
}

//получаем название изображения из миниатюры
function titleFromThumb(thumbnail) {
  return thumbnail.getAttribute('data-image-title');
}

//объединяем три предыдущие функции
function setDetailsFromThumb(thumbnail) {
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

//добавляем обработчик клика на миниатюру
function addThumbClickHandler(thumb) {
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

//получаем список всех миниатюр и преобразуем его в массив
function getThumbnailsArray() {
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

//цикл по массиву миниатюр
function initializeEvents() {
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();