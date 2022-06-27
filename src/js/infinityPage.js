export const infinityPage = {
  heightRedLine: 100,
  isScrollingRightNow: false,
  funtionToDo: null,
  idForDeletEventListner: null,

  init(fun) {
    this.idForDeletEventListner = this.checkBottom();
    window.addEventListener('scroll', this.idForDeletEventListner);
    this.funtionToDo = fun;
  },

  checkBottom: function () {
    return () => {
      if (!this.isScrollingRightNow) {
        this.isScrollingRightNow = true;
        window.requestAnimationFrame(() => {
          //reset
          this.isScrollingRightNow = false;
          //check if we reached the bottom
          if (
            window.innerHeight + window.scrollY >=
            document.body.scrollHeight - this.heightRedLine
          ) {
            this.fire();
          }
        });
      }
    };
  },

  fire() {
    this.funtionToDo();
    this.clear();
  },

  clear() {
    this.funtionToDo = null;
    window.removeEventListener('scroll', this.idForDeletEventListner);
  },
};