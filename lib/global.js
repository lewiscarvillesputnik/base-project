function global() {
  /* -- Enable active styles on iOS -- */

  /* ------------------------------------------------------------ */
  function enableiOSFocusStyles() {
    Array.prototype.forEach.call(document.querySelectorAll("body *"), function (el) {
      el.addEventListener("touchstart", function () {});
    });
  } // $('body *').on('touchstart', function (){});

  /* -- Enable keyboard only focus styles -- */

  /* ------------------------------------------------------------ */


  function enableKeyboardFocusStyles() {
    var buttons = document.querySelectorAll("a, button");

    for (var i = 0; i < buttons.length; i++) {
      // Track mouse click on target elements
      buttons[i].addEventListener("mousedown", function (e) {
        e.preventDefault();
      });
    }
  }

  const gregg = null;
  console.log(gregg);

  const test = () => {
    console.log(gregg, "in arrow function");
  };

  test();
  /* -- Detect if desktop or mobile platform -- */

  /* ------------------------------------------------------------ */

  function detectPlatform() {
    var getMobileOperatingSystem = function () {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
      }

      if (/android/i.test(userAgent)) {
        return "Android";
      }

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
      }

      return "unknown";
    };
    /* -- Detect if Windows or Mac platform -- */

    /* ------------------------------------------------------------ */


    function isWindows() {
      return navigator.platform.indexOf("Win") > -1;
    }

    function isMacintosh() {
      return navigator.platform.indexOf("Mac") > -1;
    }

    var html = document.documentElement;

    if (isWindows()) {
      html.classList.add("platform-windows");
    }

    if (isMacintosh()) {
      html.classList.add("platform-mac");
    }

    if (getMobileOperatingSystem() === "unknown") {
      html.classList.add("platform-desktop");
    } else {
      html.classList.add("platform-mobile");
    }

    if (getMobileOperatingSystem() === "Android") {
      html.classList.add("platform-android");
    }

    if (getMobileOperatingSystem() === "iOS") {
      html.classList.add("platform-ios");
    }
  }
  /* -- Enable active styles on iOS -- */


  enableiOSFocusStyles();
  /* -- Enable keyboard only focus styles -- */

  enableKeyboardFocusStyles();
  /* -- Detect if desktop or mobile platform -- */

  detectPlatform();
}

global();