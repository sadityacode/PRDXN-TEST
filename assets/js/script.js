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

    
  if (page_class.classList.contains("login-page")) {
    console.log("hii");

    // function for preventing the back button
    setTimeout(preventBack() , 0);

    // for dom manupulation of the page
    var formButton = Array.from(this.document.querySelectorAll(".get-started a"));
    var videoLi = Array.from(this.document.querySelectorAll(".banner li"));
    var closeModal = document.querySelector(".close");
    var signupFieldsArray = this.Array.from(this.document.querySelectorAll(".sign-up-form input"));
    var signinFieldsArray = this.Array.from(this.document.querySelectorAll(".sign-in-form input"));
    var submitForm = this.Array.from(this.document.querySelectorAll(".form-controls a"));
    var switchForms = this.Array.from(this.document.querySelectorAll(".pannel-container a"));

    var RegexExpression = {
      username_regex: /^([a-zA-Z]){2,10}$/,
      email_regex: /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/,
      password_regex: /((?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z])){4,15}/
    }

    // function for displaying the form modal
    formButton.forEach(function (element) {
      element.addEventListener("click", function () {
        document.querySelector(".modal").classList.add("block");

        var formModal = document.querySelector(".form-modal");
        formModal.classList.add("block");

        if (element.classList.contains("sign-in-button")) {
          formModal.classList.add("active");
        }
      });
    });

  }
}