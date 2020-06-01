'use strict';

window.onload = function () {

    var page_class = this.document.querySelector(".container");

    // function for removing preloader ( THE TOP MOST COMMON FUNCTION )
    function removeLoader() {
      setTimeout(function () {
        document.querySelector(".loader").classList.add("none");
        document.querySelector("html").classList.remove("no-scroll");
      }, 3000);
    }
  
    // function for preventing the back button
    function preventBack(){ window.history.forward(); }
}