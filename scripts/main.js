'use strict';

var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var ESC_KEY = 27;

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
    showDetails();
  });
}

//получаем список всех миниатюр и преобразуем его в массив
function getThumbnailsArray() {
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

//добавление body класса для просмотра увеличенных миниатюр
//и скрытия полноэкранного изображения
function hideDetails() {
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

//обработчик клика на миниатюры, показ полноэкранного изображения
function showDetails() {
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
}

//обработчик нажатия (отпускания) клавиши
function addKeyPressHandler() {
  document.body.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

//цикл по массиву миниатюр
function initializeEvents() {
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

initializeEvents();