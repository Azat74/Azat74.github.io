"use strict";

let gallery = document.querySelector('.gallery');
let galleryItems = [];
let galleryView = document.querySelector('.gallery-view');

function loadImg () {
  fetch('../data.json')
    .then(res => {
      return res.json()
        .then(res => {
          galleryItems = res;
          console.log(galleryItems);
          renderGalleryItems(galleryItems);
        })
    })
    .catch(e => {
      console.error(e);
    })
}



function renderGalleryItems (arr) {
  arr.forEach(item => {
    let el = document.createElement('div');
    el.classList.add('gallery__item');
    el.style.backgroundImage = `url("${item.url}")`;
    el.addEventListener('click', function () {
      showImg(item.url);
    });
    gallery.appendChild(el);
  });
}

function showImg(imgUrl) {
  let galleryView = document.createElement('div');
  galleryView.classList.add('gallery-view');
  let galleryViewParanja = document.createElement('div');
  galleryViewParanja.classList.add('gallery-view__paranja');
  galleryView.appendChild(galleryViewParanja);
  galleryViewParanja.addEventListener('click', function () {
    galleryView.remove();
  });
  let galleryViewImg = document.createElement('div');
  galleryViewImg.classList.add('gallery-view__img');
  galleryViewImg.style.backgroundImage = `url("${imgUrl}")`;
  galleryView.appendChild(galleryViewImg);
  document.querySelector('body').appendChild(galleryView);
}



loadImg();