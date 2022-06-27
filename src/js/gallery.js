import { refs } from './refs';
import { infinityPage } from './infinityPage.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import  './simpleLightBox/simple-lightbox.modules.js';

export const gallery = {
  placeForRender: refs.gallery,
  simpleLightbox: null,
  simpleLightbox: new SimpleLightbox('.gallery .photo-card a', {
    captionsData: 'alt',
    captionsDelay: 150,
    additionalHtml:
      '<button class="button-33 download-button download-button-modal" id="modalSaveBtn" data-downloaded="true" data-modal="true">download me</button>',
  }),

  render: function (data) {
    // webformatURL - посилання на маленьке зображення для списку карток.
    // largeImageURL - посилання на велике зображення.
    // tags - рядок з описом зображення. Підійде для атрибуту alt.
    // likes - кількість лайків.
    // views - кількість переглядів.
    // comments - кількість коментарів.
    // downloads - кількість завантажень.
    const markup = data.reduce((preMarkup, img) => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads, pageURL } = img;
      const pageURLSplit = pageURL.split('/');
      const imgName = pageURLSplit[pageURLSplit.length - 2];
      return (
        preMarkup +
        `
                <div class="photo-card">
                <button class='button-33 download-button' data-name='${imgName}' data-downloaded='true' data-href=${largeImageURL}>download me</button>
                     <a class='photo-card__img' href=${largeImageURL} >
                        <img src=${webformatURL} alt='${tags}' loading="lazy" />
                    </a>
                    <div class="info">
                        <p class="info-item">
                        <b class="info-accent">Likes</b>
                        ${likes}
                        </p>
                        <p class="info-item">
                        <b class="info-accent">Views</b>
                        ${views}
                        </p>
                        <p class="info-item">
                        <b class="info-accent">Comments</b>
                        ${comments}
                        </p>
                        <p class="info-item">
                        <b class="info-accent">Downloads</b>
                        ${downloads}
                        </p>
                    </div>
                    </div>
              `
      );
    }, '');

    this.placeForRender.insertAdjacentHTML('beforeEnd', markup);
    // refs.buttonLoadMore.disabled = false;

    this.refreshGalleryModule();
  },

  clear: function () {
    // refs.buttonLoadMore.disabled = true;
    this.placeForRender.innerHTML = '';
  },

  refreshGalleryModule: function () {
    //check if opened simpleLightBox
    if (this.simpleLightbox.currentImage) {
      // this.simpleLightbox.elements = Array.from(
      //   document.querySelectorAll('.gallery .photo-card a'),
      // );
      let theImg = this.simpleLightbox.elements[this.simpleLightbox.currentImageIndex];
      // console.log(theImg)
      this.simpleLightbox.destroy();
      (this.simpleLightbox = new SimpleLightbox(
        '.gallery .photo-card a',
        {
          captionsData: 'alt',
          captionsDelay: 150,
          additionalHtml:
            '<button class="button-33 download-button download-button-modal" id="modalSaveBtn" data-downloaded="true" data-modal="true">download me</button>',
        },
        theImg,
      )),
        this.refreshEvents();

      // setTimeout(function () {
      //   const answ = gallery.simpleLightbox.open(theImg);
      //   console.log('afterOpened ', answ);
      // }, 250);

      // const length = this.simpleLightbox.elements.length;

      // this.simpleLightbox.initialLocationHash = `pid=${length}`;
      // this.simpleLightbox.initialLocationHash = '';

      // this.simpleLightbox.relatedElements =
      //   this.simpleLightbox.getRelated();
      //   this.simpleLightbox.domNodes.counter.querySelector('.sl-total').innerHTML =
      //   length;

      //   simpleLightbox.addEvents();

      // this.simpleLightbox.updateURL();
      // this.simpleLightbox.updateHash();
      // this.simpleLightbox.on('closed.simplelightbox', function () {
      //   gallery.simpleLightbox.refresh();
      //   gallery.refreshEvents();
      // });
    } else {
      this.simpleLightbox.refresh();
      this.refreshEvents();
    }
  },

  refreshEvents() {
    this.simpleLightbox.on('shown.simplelightbox', gallery.checkApprochingToCurrentLastImg);
    this.simpleLightbox.on('changed.simplelightbox', gallery.checkApprochingToCurrentLastImg);
    // this.simpleLightbox.on('prev.simplelightbox', this.checkOpenLast);
    // this.simpleLightbox.on('closed.simplelightbox', function () {
    //   gallery.simpleLightbox.elements[gallery.simpleLightbox.currentImageIndex].scrollIntoView();
    // });
  },

  checkApprochingToCurrentLastImg() {
    if (!infinityPage.funtionToDo) if (!infinityPage.funtionToDo) return;

    // const { currentImageIndex } = gallery.simpleLightbox;
    // if (currentImageIndex === 0)  return infinityPage.fire();

    const numberForFire = 2;
    const {
      elements: { length },
      currentImageIndex,
    } = gallery.simpleLightbox;
    // console.log(length - numberForFire, ' >=', currentImageIndex, gallery.simpleLightbox);
    if (length - numberForFire <= currentImageIndex) {
      // console.log(true);
      infinityPage.fire();
    }
  },

  checkOpenLast() {
    const { currentImageIndex } = gallery.simpleLightbox;

    if (currentImageIndex === 0) infinityPage.fire();
  },
};