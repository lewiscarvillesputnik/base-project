const lazyload = () => {
  /* -- Lazyload & WebP Support -- */
  /* ------------------------------------------------------------ */
  var config = {
      rootMargin: '0px 0px 200px 0px',
      threshold: 0,
    },
    lazyloadImages = document.querySelectorAll('.js-lazyload')

  /* Determine if browser supports webp image type */
  function supportsWebp() {
    var elem = document.createElement('canvas')
    if (!!(elem.getContext && elem.getContext('2d'))) {
      var testString = !(window.mozInnerScreenX == null) ? 'png' : 'webp'
      // was able or not to get WebP representation
      return elem.toDataURL('image/webp').indexOf('data:image/' + testString) == 0
    }
    // very old browser like IE 8, canvas not supported
    return false
  }

  /* Determine which size image to display */
  function imageSize(el) {
    /* Retina */
    var retina = window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches,
      /* Desktop */
      standardDesktop = el.getAttribute('data-desktop-src'),
      retinaDesktop = el.getAttribute('data-desktop-retina-src'),
      desktopScreen = window.matchMedia('(min-width: 1025px)').matches,
      /* Tablet & Mobile */
      standardTablet = el.getAttribute('data-tablet-src'),
      retinaTablet = el.getAttribute('data-tablet-retina-src'),
      standardMobile = el.getAttribute('data-mobile-src'),
      retinaMobile = el.getAttribute('data-mobile-retina-src'),
      tabletScreen = window.matchMedia('(min-width: 576px) and (max-width: 1024px)').matches,
      mobileScreen = window.matchMedia('(max-width: 575px)').matches,
      /* Alternative Tablet & Mobile */
      standardAltTablet = el.getAttribute('data-tablet-alt-src'),
      retinaAltTablet = el.getAttribute('data-tablet-alt-retina-src'),
      standardAltMobile = el.getAttribute('data-mobile-alt-src'),
      retinaAltMobile = el.getAttribute('data-mobile-alt-retina-src'),
      tabletAltScreen = window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches,
      mobileAltScreen = window.matchMedia('(max-width: 767px)').matches

    if (retina) {
      if (desktopScreen) {
        return retinaDesktop != undefined ? retinaDesktop + imageFileType(el) : standardDesktop + imageFileType(el)
      } else if (tabletScreen && (retinaTablet != undefined || standardTablet != undefined)) {
        return retinaTablet != undefined
          ? retinaTablet + imageFileType(el)
          : standardTablet != undefined
          ? standardTablet + imageFileType(el)
          : standardDesktop + imageFileType(el)
      } else if (tabletAltScreen && (retinaAltTablet != undefined || standardAltTablet != undefined)) {
        return retinaAltTablet != undefined
          ? retinaAltTablet + imageFileType(el)
          : standardAltTablet != undefined
          ? standardAltTablet + imageFileType(el)
          : standardDesktop + imageFileType(el)
      } else if (mobileScreen && (retinaMobile != undefined || standardMobile != undefined)) {
        return retinaMobile != undefined
          ? retinaMobile + imageFileType(el)
          : standardMobile != undefined
          ? standardMobile + imageFileType(el)
          : standardDesktop + imageFileType(el)
      } else if (mobileAltScreen && (retinaAltMobile != undefined || standardAltMobile != undefined)) {
        return retinaAltMobile != undefined
          ? retinaAltMobile + imageFileType(el)
          : standardAltMobile != undefined
          ? standardAltMobile + imageFileType(el)
          : standardDesktop + imageFileType(el)
      } else {
        return standardDesktop + imageFileType(el)
      }
    } else {
      if (desktopScreen) {
        return standardDesktop + imageFileType(el)
      } else if (tabletScreen && standardTablet != undefined) {
        return standardTablet != undefined ? standardTablet + imageFileType(el) : standardDesktop + imageFileType(el)
      } else if (tabletAltScreen && standardAltTablet != undefined) {
        return standardAltTablet != undefined
          ? standardAltTablet + imageFileType(el)
          : standardDesktop + imageFileType(el)
      } else if (mobileScreen && standardMobile != undefined) {
        return standardMobile != undefined ? standardMobile + imageFileType(el) : standardDesktop + imageFileType(el)
      } else if (mobileAltScreen && standardAltMobile != undefined) {
        return standardAltMobile != undefined
          ? standardAltMobile + imageFileType(el)
          : standardDesktop + imageFileType(el)
      } else {
        return standardDesktop + imageFileType(el)
      }
    }
  }

  /* Determine the image src and procedure for setting the image */
  function imageType(el, src) {
    if (el.hasAttribute('src')) {
      if (el.src !== src) {
        el.src = src
      }
    } else {
      if (el.getAttribute('style') !== 'background-image: url(' + src + ')') {
        el.setAttribute('style', 'background-image: url(' + src + ')')
      }
    }
  }

  /* Determine image file type */
  function imageFileType(el) {
    var defaultFileType = el.getAttribute('data-filetype'),
      webp = el.getAttribute('data-uses-webp')
    if (typeof webp !== undefined && webp === 'true' && supportsWebp()) {
      return '.webp'
    } else {
      if (typeof defaultFileType !== undefined && defaultFileType !== null && defaultFileType !== '') {
        return '.' + defaultFileType
      } else {
        if (document.URL.indexOf('/service/') === -1) {
          console.log('This element requires a data-filetype attribute:', el)
        }
        return ''
      }
    }
  }
  /* Set image */
  function setImages(el) {
    imageType(el, imageSize(el))
  }

  /* Fade in the image */
  function fadeIn(el) {
    if (!('classList' in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
      // Support for IE9 / IE8
      el.className += ' lazyloaded'
    } else {
      el.classList.add('lazyloaded')
    }
  }

  /* Set Images on resize */
  function setImagesOnResize(image) {
    window.addEventListener('resize', function () {
      if ('IntersectionObserver' in window) {
        setImages(image)
      } else {
        lazyloadViaEvents()
      }
    })
  }

  /* Set Images on orientationChange */
  function setImagesOnOrientationChange(image) {
    window.addEventListener('orientationChange', function () {
      if ('IntersectionObserver' in window) {
        setImages(image)
      } else {
        lazyloadViaEvents()
      }
    })
  }

  /* Set Images on scroll */
  function setImagesOnScroll(image) {
    window.addEventListener('scroll', function () {
      if (!('IntersectionObserver' in window)) {
        lazyloadViaEvents()
      }
    })
  }

  /* Preload and set images */
  function preloadImages(el, unobserveImage) {
    var preloadImage = new Image()
    preloadImage.src = imageSize(el)
    if (!preloadImage.src) {
      return
    }
    preloadImage.onload = function () {
      unobserveImage
      setImages(el)
      fadeIn(el)
    }
  }

  /* Modern browser implementation of lazyload using Intersection Observer */
  function modernBrowserLazyload(lazyloadImages) {
    if ('IntersectionObserver' in window && typeof lazyloadImages !== 'undefined') {
      var imageObserver = new IntersectionObserver(function (entries, self) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            self.unobserve(entry.target) // Unobserve the entry.target first otherwise the timings of the other functions will be thrown off
            preloadImages(entry.target)
            setImagesOnResize(entry.target)
            setImagesOnOrientationChange(entry.target)
          }
        })
      }, config)
      lazyloadImages.forEach(function (image) {
        imageObserver.observe(image)
      })
    }
  }

  /* Calculate Image Position */
  function getCoordinates(el) {
    var rect = el.getBoundingClientRect()
    var LeftPos = rect.left
    var TopPos = rect.top
    return {X: LeftPos, Y: TopPos}
  }

  /* Lazyload images via image position */
  function lazyloadViaEvents(lazyloadImages) {
    var lazyloadThrottleTimeout
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout)
    }
    lazyloadThrottleTimeout = setTimeout(function () {
      var scrollTop = window.pageYOffset
      var lazyloadImages = document.querySelectorAll('.js-lazyload')
      Array.prototype.forEach.call(lazyloadImages, function (innerEl, i) {
        if (getCoordinates(innerEl).Y < window.innerHeight + scrollTop) {
          setImages(innerEl)
          fadeIn(innerEl)
        }
      })
    }, 20)
  }

  /* Old Browser (IE) implementation of lazyload using offset of image and scroll behaviour */
  function oldBrowserLazyload() {
    if (!('IntersectionObserver' in window) && typeof lazyloadImages !== 'undefined') {
      lazyloadViaEvents()
      setImagesOnResize()
      setImagesOnOrientationChange()
      setImagesOnScroll()
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    oldBrowserLazyload()
    modernBrowserLazyload(lazyloadImages)
  })
}

export default lazyload
/* -- Lazyload & WebP Support -- */
lazyload()
