import terminusFetch from '@abcnews/terminus-fetch';
import './styles.css';

function prefetch(url) {
  if (
    'connection' in navigator &&
    ((navigator.connection.effectiveType || '').includes('2g') || navigator.connection.saveData)
  ) {
    return;
  }

  try {
    const link = document.createElement('link');
    if (!link.relList || typeof link.relList.supports !== 'function' || !link.relList.supports('prefetch')) {
      throw new Error('Prefetch unsupported');
    }
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  } catch (err) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.withCredentials = true;
    xhr.send();
  }
}

const videoId = (window.location.search.match(/id=(\d+)/) || [])[1];
const target = (window.location.search.match(/originalLinkTarget=([^&]+)/) || [])[1];
const isPreviewTarget = target && target.indexOf('nucwed') > -1;

if (target) {
  thumbnail.href = target;
  prefetch(target);
}

if (videoId) {
  terminusFetch({ id: videoId, type: 'video', forcePreview: isPreviewTarget }, (err, item) => {
    if (err) {
      return console.error(err);
    }

    // Set video source (always aim for smallest)
    video.src = item.media.video.renditions.files.sort((a, b) => {
      return (a.size || 1) - (b.size || 0);
    })[0].url;

    // Set title
    thumbnail.title = item.title;

    // Set fallback image, in case device can't play video
    if (item._embedded.mediaThumbnail) {
      const image = item._embedded.mediaThumbnail.complete.find((x) => x.url.indexOf('16x9-large') > -1);

      if (image) {
        thumbnail.style.backgroundImage = `url(${image.url})`;
      }
    }
  });
}
