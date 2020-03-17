window.addEventListener("scroll", checkslide);
  var scroll = document.querySelector("main");
  var randomArray = [];

  var article = scroll.querySelectorAll("article");
  for(var i = 0; i < article.length ; i++ ){
    randomArray.push(article[i]);
  }

  var abc = (scroll.offsetTop + scroll.offsetHeight / 2);
  var pageAt = (window.scrollY + window.innerHeight);
  if(pageAt > abc){
  randomArray.forEach(function(element){
      element.classList.add("passed");
  })
}


  function checkslide() {

      var pageAtNow = (window.scrollY + window.innerHeight);
      var abc = (scroll.offsetTop + scroll.offsetHeight / 2);

      if (pageAtNow > abc ) {

        randomArray.forEach(function(element){
          var passed = element.classList.contains("passed");
          if(!passed){
            element.classList.add("active");
          }
        })

      }
  }

// var scroll = document.querySelector("main");

// window.addEventListener("scroll", function () {
//   var article = this.document.querySelectorAll("article");
//   var articleArray = Array.from(article);
//   var pageAtNow = (window.scrollY + window.innerHeight);
//   var abc = (scroll.offsetTop + scroll.offsetHeight / 2);
//   var xyz = (scroll.offsetTop +)

//   if (pageAtNow > abc) {
//     articleArray.forEach(function (element) {
//       var scrolled = window.pageYOffset;
//       var rate = scrolled *  2;
      
//       element.style.transform = "translateY"
//   });
//   }
// });