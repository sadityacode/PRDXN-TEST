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

    // function for sign up form validation
    signupFieldsArray.forEach(function (element) {
      var inputRegex = element.getAttribute("data-regex");
      for (var key in RegexExpression) {

        if (inputRegex === key) {

          var regexForThis = RegexExpression[key];

          element.addEventListener("keyup", function () {
            validate(regexForThis, this);
          })
        }
      }
    });

    // function for form validate the regex
    function validate(RegularExpression, input) {
      var parent = input.parentNode;
      if (input.value == "") {
        parent.classList = "form-group";
      }
      else if (RegularExpression.test(input.value)) {
        parent.classList = "form-group success"
      } else {
        parent.classList = "form-group error"
      }
    }

    // function for sign in form validation
    signinFieldsArray.forEach(function (element) {
      element.addEventListener("keyup", function () {
        element.parentElement.classList = "form-group";
      })
    });


    // function for form submission
    submitForm.forEach(function (element) {

      if (element.classList.contains("sign-up")) {
        element.addEventListener("click", storeData);
      }

      if (element.classList.contains("sign-in")) {
        element.addEventListener("click", verifyUser);
      }
    });

    // function for storing data
    function storeData(e) {
      e.preventDefault();

      var allFeildsRight = null;
      var newEmail = document.querySelector(".sign-up-email");

      // checking the all feilds are right or wrong
      for (var i = 0; i < signupFieldsArray.length; i++) {
        var parent = signupFieldsArray[i].parentNode;
        if (parent.classList.contains("error") || parent.classList == "form-group") {
          allFeildsRight = false;
          signupFieldsArray.forEach(function (element) {
            if (element.value === "") {
              element.parentNode.classList.add("error");
            }
          });
          break;
        } else if (parent.classList.contains("success")) { allFeildsRight = true; }
      }

      // checking the email-id already registered or not
      var UserAlreadyExist = checkUser(newEmail);

      // function if both the condition are satisfying
      if (allFeildsRight && !UserAlreadyExist) {

        var username = document.querySelector(".sign-up-name");
        var email = document.querySelector(".sign-up-email");
        var password = document.querySelector(".sign-up-password");
        alert("FORM SUCCESSFULLY SUBMITED");

        var unicode = "tmdbuser" + window.localStorage.length;

        var data = {
          name: username.value,
          mail: email.value,
          pass: password.value,
          unicode: unicode
        }

        var data_serialized = JSON.stringify(data);

        window.localStorage.setItem(unicode, data_serialized);

        formReset();
        window.location.assign("movies.html?userid=" + unicode + "&category=movie");
      } else { newEmail.parentElement.classList = "form-group error" }
    }

    // function for checking the user-is exist or not
    function checkUser(Email) {
      if (localStorage.length !== 0) {
        for (var key in localStorage) {
          if (key === "length") { break; }
          else if (key.includes("tmdbuser")) {
            var parseData = JSON.parse(localStorage[key]);

            if (Email.value === parseData.mail) {
              return parseData;
            }
          }
        } return false;
      } else { return false; }
    }

    // function for verifying the user
    function verifyUser() {
      var signInEmail = document.querySelector(".sign-in-email");

      var UserAlreadyExist = checkUser(signInEmail);
      if (UserAlreadyExist) {
        var signInPassword = document.querySelector(".sign-in-password");
        var password = UserAlreadyExist.pass;
        if (signInPassword.value === password) {
          formReset();
          var unicode = UserAlreadyExist.unicode;
          window.location.assign("movies.html?userid=" + unicode + "&category=movie");
        } else { signInPassword.parentElement.classList.add("error") }
      } else { signInEmail.parentElement.classList.add("error") }
    }

    // function for resetting the form
    function formReset() {
      var forms = Array.from(document.querySelectorAll("form"));

      forms.forEach(function (element) {
        element.reset();

        var formGroups = Array.from(element.querySelectorAll(".form-group"));
        formGroups.forEach(function (element) {
          element.classList = "form-group";
        });
      });
    }

    // for removing preloader
    removeLoader();

  } else {

    // some confidential information
    var base_url = "https://api.themoviedb.org/3/";
    var key = "b4803476184cb34c231d8f2f07da0bc7";
    var contractual_url = "&language=en-US&page=1";
    var trending_config = "trending";
    var top_rated_config = "top_rated";
    var most_popular_config = "popular";
    var now_playing_config = "now_playing";
    var upcoming_config = "upcoming";
    var airing_today_config = "airing_today";
    var on_air_config = "on_the_air";
    var currentUrl = new URL(window.location.href);
    var loggedInUser = currentUrl.searchParams.get("userid");

    // function for preventing direct redirection on page
    if(!loggedInUser){ window.location.assign("index.html"); }

    // javascript for rest of the pages except login page 
    var hamburger = this.document.querySelector(".hamburger");
    var searchFeild = this.document.querySelector(".input-text");
    var signOut = this.document.querySelector(".sign-out");

    // function for activating the nav bar
    hamburger.addEventListener("click", function () {
      document.querySelector("nav").classList.toggle("active");
      hamburger.classList.toggle("active-hamburger");
      document.querySelector("html").classList.toggle("no-scroll");
    })

    
  }
}