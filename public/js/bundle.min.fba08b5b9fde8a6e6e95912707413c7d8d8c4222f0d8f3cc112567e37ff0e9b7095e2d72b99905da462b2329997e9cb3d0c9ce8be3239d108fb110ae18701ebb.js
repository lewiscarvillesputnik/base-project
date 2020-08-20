function global(){function enableiOSFocusStyles(){Array.prototype.forEach.call(document.querySelectorAll("body *"),function(el){el.addEventListener("touchstart",function(){})})}
function enableKeyboardFocusStyles(){var buttons=document.querySelectorAll("a, button")
for(var i=0;i<buttons.length;i++){buttons[i].addEventListener("mousedown",function(e){e.preventDefault()})}}
function detectPlatform(){var getMobileOperatingSystem=function(){var userAgent=navigator.userAgent||navigator.vendor||window.opera
if(/windows phone/i.test(userAgent)){return "Windows Phone"}
if(/android/i.test(userAgent)){return "Android"}
if(/iPad|iPhone|iPod/.test(userAgent)&&!window.MSStream){return "iOS"}
return "unknown"}
function isWindows(){return navigator.platform.indexOf("Win")>-1}
function isMacintosh(){return navigator.platform.indexOf("Mac")>-1}
var html=document.documentElement
if(isWindows()){html.classList.add("platform-windows")}
if(isMacintosh()){html.classList.add("platform-mac")}
if(getMobileOperatingSystem()==="unknown"){html.classList.add("platform-desktop")}else{html.classList.add("platform-mobile")}
if(getMobileOperatingSystem()==="Android"){html.classList.add("platform-android")}
if(getMobileOperatingSystem()==="iOS"){html.classList.add("platform-ios")}}
enableiOSFocusStyles()
enableKeyboardFocusStyles()
detectPlatform()}
global();function lazyload(){var config={rootMargin:"0px 0px 200px 0px",threshold:0,},lazyloadImages=document.querySelectorAll(".js-lazyload")
function supportsWebp(){var elem=document.createElement("canvas")
if(!!(elem.getContext&&elem.getContext("2d"))){var testString=!(window.mozInnerScreenX==null)?"png":"webp"
return elem.toDataURL("image/webp").indexOf("data:image/"+testString)==0}
return false}
function imageSize(el){var retina=window.matchMedia("(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)").matches,standardDesktop=el.getAttribute("data-desktop-src"),retinaDesktop=el.getAttribute("data-desktop-retina-src"),desktopScreen=window.matchMedia("(min-width: 1025px)").matches,standardTablet=el.getAttribute("data-tablet-src"),retinaTablet=el.getAttribute("data-tablet-retina-src"),standardMobile=el.getAttribute("data-mobile-src"),retinaMobile=el.getAttribute("data-mobile-retina-src"),tabletScreen=window.matchMedia("(min-width: 576px) and (max-width: 1024px)").matches,mobileScreen=window.matchMedia("(max-width: 575px)").matches,standardAltTablet=el.getAttribute("data-tablet-alt-src"),retinaAltTablet=el.getAttribute("data-tablet-alt-retina-src"),standardAltMobile=el.getAttribute("data-mobile-alt-src"),retinaAltMobile=el.getAttribute("data-mobile-alt-retina-src"),tabletAltScreen=window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches,mobileAltScreen=window.matchMedia("(max-width: 767px)").matches
if(retina){if(desktopScreen){return retinaDesktop!=undefined?retinaDesktop+imageFileType(el):standardDesktop+imageFileType(el)}else if(tabletScreen&&(retinaTablet!=undefined||standardTablet!=undefined)){return retinaTablet!=undefined?retinaTablet+imageFileType(el):standardTablet!=undefined?standardTablet+imageFileType(el):standardDesktop+imageFileType(el)}else if(tabletAltScreen&&(retinaAltTablet!=undefined||standardAltTablet!=undefined)){return retinaAltTablet!=undefined?retinaAltTablet+imageFileType(el):standardAltTablet!=undefined?standardAltTablet+imageFileType(el):standardDesktop+imageFileType(el)}else if(mobileScreen&&(retinaMobile!=undefined||standardMobile!=undefined)){return retinaMobile!=undefined?retinaMobile+imageFileType(el):standardMobile!=undefined?standardMobile+imageFileType(el):standardDesktop+imageFileType(el)}else if(mobileAltScreen&&(retinaAltMobile!=undefined||standardAltMobile!=undefined)){return retinaAltMobile!=undefined?retinaAltMobile+imageFileType(el):standardAltMobile!=undefined?standardAltMobile+imageFileType(el):standardDesktop+imageFileType(el)}else{return standardDesktop+imageFileType(el)}}else{if(desktopScreen){return standardDesktop+imageFileType(el)}else if(tabletScreen&&standardTablet!=undefined){return standardTablet!=undefined?standardTablet+imageFileType(el):standardDesktop+imageFileType(el)}else if(tabletAltScreen&&standardAltTablet!=undefined){return standardAltTablet!=undefined?standardAltTablet+imageFileType(el):standardDesktop+imageFileType(el)}else if(mobileScreen&&standardMobile!=undefined){return standardMobile!=undefined?standardMobile+imageFileType(el):standardDesktop+imageFileType(el)}else if(mobileAltScreen&&standardAltMobile!=undefined){return standardAltMobile!=undefined?standardAltMobile+imageFileType(el):standardDesktop+imageFileType(el)}else{return standardDesktop+imageFileType(el)}}}
function imageType(el,src){if(el.hasAttribute("src")){if(el.src!==src){el.src=src}}else{if(el.getAttribute("style")!=="background-image: url("+src+")"){el.setAttribute("style","background-image: url("+src+")")}}}
function imageFileType(el){var defaultFileType=el.getAttribute("data-filetype"),webp=el.getAttribute("data-uses-webp")
if(typeof webp!==undefined&&webp==="true"&&supportsWebp()){return ".webp"}else{if(typeof defaultFileType!==undefined&&defaultFileType!==null&&defaultFileType!==""){return "."+defaultFileType}else{if(document.URL.indexOf("/service/")===-1){console.log("This element requires a data-filetype attribute:",el)}
return ""}}}
function setImages(el){imageType(el,imageSize(el))}
function fadeIn(el){if(!("classList"in document.documentElement)&&Object.defineProperty&&typeof HTMLElement!=="undefined"){el.className+=" lazyloaded"}else{el.classList.add("lazyloaded")}}
function setImagesOnResize(image){window.addEventListener("resize",function(){if("IntersectionObserver"in window){setImages(image)}else{lazyloadViaEvents()}})}
function setImagesOnOrientationChange(image){window.addEventListener("orientationChange",function(){if("IntersectionObserver"in window){setImages(image)}else{lazyloadViaEvents()}})}
function setImagesOnScroll(image){window.addEventListener("scroll",function(){if(!("IntersectionObserver"in window)){lazyloadViaEvents()}})}
function preloadImages(el,unobserveImage){var preloadImage=new Image()
preloadImage.src=imageSize(el)
if(!preloadImage.src){return}
preloadImage.onload=function(){unobserveImage
setImages(el)
fadeIn(el)}}
function modernBrowserLazyload(lazyloadImages){if("IntersectionObserver"in window&&typeof lazyloadImages!=="undefined"){var imageObserver=new IntersectionObserver(function(entries,self){entries.forEach(function(entry){if(entry.isIntersecting){self.unobserve(entry.target)
preloadImages(entry.target)
setImagesOnResize(entry.target)
setImagesOnOrientationChange(entry.target)}})},config)
lazyloadImages.forEach(function(image){imageObserver.observe(image)})}}
function getCoordinates(el){var rect=el.getBoundingClientRect()
var LeftPos=rect.left
var TopPos=rect.top
return{X:LeftPos,Y:TopPos}}
function lazyloadViaEvents(lazyloadImages){var lazyloadThrottleTimeout
if(lazyloadThrottleTimeout){clearTimeout(lazyloadThrottleTimeout)}
lazyloadThrottleTimeout=setTimeout(function(){var scrollTop=window.pageYOffset
var lazyloadImages=document.querySelectorAll(".js-lazyload")
Array.prototype.forEach.call(lazyloadImages,function(innerEl,i){if(getCoordinates(innerEl).Y<window.innerHeight+scrollTop){setImages(innerEl)
fadeIn(innerEl)}})},20)}
function oldBrowserLazyload(){if(!("IntersectionObserver"in window)&&typeof lazyloadImages!=="undefined"){lazyloadViaEvents()
setImagesOnResize()
setImagesOnOrientationChange()
setImagesOnScroll()}}
document.addEventListener("DOMContentLoaded",function(){oldBrowserLazyload()
modernBrowserLazyload(lazyloadImages)})}
lazyload();