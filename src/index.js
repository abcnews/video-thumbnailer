import capiFetch from '@abcnews/capi-fetch';
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
  capiFetch(
    videoId,
    (err, item) => {
      if (err) {
        return console.error(err);
      }
      video.src = item.renditions[0].url;
      thumbnail.title = item.captionPlain;
    },
    null,
    isPreviewTarget
  );
}
