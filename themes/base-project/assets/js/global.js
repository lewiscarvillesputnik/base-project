const global = (() => {

  /* -- Enable active styles on iOS -- */
  /* ------------------------------------------------------------ */
  const enableiOSFocusStyles = (() => {
    Array.prototype.forEach.call(document.querySelectorAll("body *"), (el) => {
      el.addEventListener("touchstart", () => { })
    })
  })();

  /* -- Enable keyboard only focus styles -- */
  /* ------------------------------------------------------------ */
  const enableKeyboardFocusStyles = (() => {
    var buttons = document.querySelectorAll("a, button")

    for (var i = 0; i < buttons.length; i++) {
      // Track mouse click on target elements
      buttons[i].addEventListener("mousedown", (e) => {
        e.preventDefault()
      })
    }
  })();

  /* -- Detect if desktop or mobile platform -- */
  /* ------------------------------------------------------------ */
  const detectPlatform = (() => {
    const getMobileOperatingSystem = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera

      if (/windows phone/i.test(userAgent)) {
        return "Windows Phone"
      }

      if (/android/i.test(userAgent)) {
        return "Android"
      }

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS"
      }

      return "unknown"
    }

    /* -- Detect if Windows or Mac platform -- */
    /* ------------------------------------------------------------ */
    const isWindows = () => {
      return navigator.platform.indexOf("Win") > -1
    }

    const isMacintosh = () => {
      return navigator.platform.indexOf("Mac") > -1
    }

    const html = document.documentElement

    if (isWindows()) {
      html.classList.add("platform-windows")
    }
    if (isMacintosh()) {
      html.classList.add("platform-mac")
    }
    if (getMobileOperatingSystem() === "unknown") {
      html.classList.add("platform-desktop")
    } else {
      html.classList.add("platform-mobile")
    }
    if (getMobileOperatingSystem() === "Android") {
      html.classList.add("platform-android")
    }
    if (getMobileOperatingSystem() === "iOS") {
      html.classList.add("platform-ios")
    }
  })();

})();
