import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as axios from 'axios';
import { modalWait } from './modalWaitLoad';

export const searchMechanics = {
  API_PRIVAT_KEY: '27649790-7921965d78458e948654f4c92',
  page: 1,
  per_page: 40,
  currentQuery: null,
  lastRespons: undefined,

  fetchPhotos: async function (userQuery) {
    //do only when user used search buttom
    if (userQuery) {
      this.page = 1;
      this.currentQuery = userQuery;
      this.lastRespons = undefined;
    } else if (this.checkRechedEnd()) {
      //check every time when page(not user) is getting extra data from backEnd
      Notify.info("We're sorry, but you've reached the end of search results.", {
        timeout: 6000,
      });
      modalWait.hide();
      return 0;
    }

    const urlQuery = `https://pixabay.com/api/?key=${this.API_PRIVAT_KEY}&q=${this.currentQuery}&image_type=photo&orientation=horizontal&=safesearch=true&page=${this.page}&per_page=${this.per_page}`;
    this.page += 1;
    // const response = await fetch(urlQuery);
    // const dataFromBackEnd = await response.json();
    // this.lastRespons = dataFromBackEnd;

    const response = await axios.get(urlQuery);
    this.lastRespons = response.data;

    //check for bad request
    if (response.data.total === 0) return 1;

    return response.data;
  },

  checkRechedEnd: function () {
    if (this.per_page * (this.page - 1) < this.lastRespons.total) return;
    // console.log('THE END');
    // refs.buttonLoadMore.disabled = true;
    return true;
  },
};