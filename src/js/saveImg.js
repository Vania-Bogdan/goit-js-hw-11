import { refs } from './refs';
import { gallery } from './gallery';

export async function saveImage(e, el) {
  if (!e.target.dataset.downloaded) return;

  const imgEl = e.target.dataset.modal
    ? gallery.simpleLightbox.elements[gallery.simpleLightbox.currentImageIndex]
        .previousElementSibling
    : e.target;

  const image = await fetch(imgEl.dataset.href);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = refs.elementForDownloadImgs;
  link.href = imageURL;
  link.download = imgEl.dataset.name;
  link.click();
}

// refs.gallery.addEventListener('click', saveImage);
document.body.addEventListener('click', saveImage);