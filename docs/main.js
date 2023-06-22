"use strict";

(function () {

  "use strict";

  var clock = document.getElementById("clock"),
      hours = getHours(),
      x = 0,
      y = 0,
      isVisible = false,
      isTouch = false;

  setInterval(function () {
    hours = getHours();
  }, 1000);

  document.addEventListener("mousemove", function (evt) {
    if (!isTouch) {
      x = evt.clientX;
      y = evt.clientY;
      isVisible = true;
      isTouch = false;
    }
  }, false);

  document.addEventListener("mouseleave", function (evt) {
    isVisible = false;
  }, false);

  document.addEventListener("touchstart", function (evt) {
    isVisible = true;
    isTouch = true;
    x = evt.touches[0].clientX;
    y = evt.touches[0].clientY;
  }, false);

  document.addEventListener("touchmove", function (evt) {
    evt.preventDefault();
    isVisible = true;
    isTouch = true;
    x = evt.touches[0].clientX;
    y = evt.touches[0].clientY;
  }, {
    passive: false
  });

  document.addEventListener("touchend", function (evt) {
    isVisible = false;
    setTimeout(function () {
      isTouch = false;
    }, 50);
  }, false);

  requestAnimationFrame(draw);

  function getHours() {
    var date = new Date(),
        hours = date.getHours() % 12,
        minutes = date.getMinutes();

    return (hours + minutes / 60) * 10 | 0;
  }

  function draw() {
    clock.dataset.visible = isVisible;
    clock.dataset.touch = isTouch;
    clock.style.cssText = "; top: " + y + "px; left: " + x + "px";
    clock.dataset.hours = hours;
    requestAnimationFrame(draw);
  }
})();