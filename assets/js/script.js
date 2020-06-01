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

    
    // function for switching the forms
    switchForms.forEach(function (element) {
      element.addEventListener("click", function () {
        var formModal = document.querySelector(".form-modal");
        if (element.id === "sign-in-form") {
          formModal.classList.add("active");
        } else { formModal.classList.remove("active"); }
      })
    });

    // function for displaying the video modal
    videoLi.forEach(function (element) {
      element.addEventListener("click", function () {
        document.querySelector(".modal").classList.add("block");

        var videoModal = document.querySelector(".video-modal");
        videoModal.classList.add("block");

        var videoSource = element.getAttribute("data-video-source");

        videoModal.firstElementChild.setAttribute("src", videoSource);
      })
    });

    // function for closing the modal
    closeModal.addEventListener("click", function () {
      var activeModal = document.querySelector(".modal .block");

      if (activeModal.classList.contains("form-modal")) {
        document.querySelector(".form-modal").classList.remove("block");
        document.querySelector(".form-modal").classList.remove("active");

        formReset();
      }
      else if (activeModal.classList.contains("video-modal")) {
        document.querySelector(".video-modal").classList.remove("block");
        document.querySelector("video").pause();
        document.querySelector("video").currentTime = 0;
      }

      document.querySelector(".modal").classList.remove("block");
    })

  }
}