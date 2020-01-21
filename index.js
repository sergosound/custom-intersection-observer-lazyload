document.addEventListener('DOMContentLoaded', function() {
  let timeout;
  const images = document.querySelectorAll('img.lazy');

  function lazyload() {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(function() {
      const scrollTop = window.pageYOffset;

      images.forEach(image => {
        if (image.offsetTop < (scrollTop + window.innerHeight)) {
          image.src = image.dataset.lazySrc;
          image.classList.remove('lazy');
        }

        if (!images.length) {
          document.removeEventListener('scroll', lazyload);
          window.removeEventListener('resize', lazyload);
          window.removeEventListener('orientationChange', lazyload);
        }
      })
    }, 20)
  }

  if ('IntersectionObserver' in window) {
    const callback = function(entries) {
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          
          image.src = image.dataset.lazySrc;
          image.classList.remove('lazy');
        }
      })
    };
    
    const lazyObserver = new IntersectionObserver(callback);
    images.forEach(image => lazyObserver.observe(image));
    
  } else {
    
    lazyload();
    document.addEventListener('scroll', lazyload);
    window.addEventListener('resize', lazyload);
    window.addEventListener('orientationChange', lazyload);
  }
});
