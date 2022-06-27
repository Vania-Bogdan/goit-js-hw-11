export const modalWait = {
  modal: document.getElementsByClassName('modal-wait-load')[0],
  show() {
    this.modal.classList.remove('hide');
  },

  hide() {
    this.modal.classList.add('hide');
  },
};