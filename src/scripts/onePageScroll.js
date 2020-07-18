
var onePageScroll = require("one-page-scroll");

// const fullPage = require("fullpage.js");
// import fullpage from "fullpage.js";

// exports.onePageScroll = function(){
//     return new onePageScroll();
// }
// console.log(onePageScroll);

// document.addEventListener('DOMContentLoaded', function() {
//     var app = new onePageScroll({
//       el: document.querySelectorAll('section'),
//     })
//   })
// var fullPageInstance = new fullPage('#fullPage', {
//     navigation: true,
//     sectionsColor:['#ff5f45', '#0798ec', '#fc6c7c', 'grey']
// });
// document.addEventListener('DOMContentLoaded', function() {
// var el = document.querySelectorAll('section');
// var app = new onePageScroll({
//     ".home", {
//         footer: "footer"
//     },
//     el: el
// });
// export var onePage = 12;
document.addEventListener('DOMContentLoaded', function() {
      var el = document.querySelectorAll('section');
      var app = new onePageScroll({
          el: el
    });
    window.app = app;
  });
  var navBar = document.querySelector('nav');
  var navs = navBar.querySelectorAll('.menu_link');

  for(var navsIndex = 0;navsIndex<navs.length;navsIndex++){
      var navLink = navs[navsIndex];
      navLink.addEventListener('click', function(event){
          event.preventDefault();
      })
  };
// document.addEventListener('click', function(event){

// });


    // function readApp(){
    //     console.log(app);
    // }

    // app.el = document.querySelectorAll('section');

