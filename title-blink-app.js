// var hidden, visibilityChange; 
// if (typeof document.hidden !== "undefined") {
//   hidden = "hidden";
//   visibilityChange = "visibilitychange";
// } else if (typeof document.msHidden !== "undefined") {
//   hidden = "msHidden";
//   visibilityChange = "msvisibilitychange";
// } else if (typeof document.webkitHidden !== "undefined") {
//   hidden = "webkitHidden";
//   visibilityChange = "webkitvisibilitychange";
// }

// var title = document.title;

// function a(){document.title="Come back!",setTimeout(b,1e3)}function b(){document.title="😁",setTimeout(a,1e3)}a();

// function handleVisibilityChange() {
//   if (document[hidden]) {
//     document.title = a;
//   } else {
//     document.title = title;
//   }
// }

// if (typeof document.addEventListener === "undefined" || hidden === undefined) {
//   console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
// } else {
//   // Handle page visibility change   
//   document.addEventListener(visibilityChange, handleVisibilityChange, false);
// }



// var title = document.title;

// function handleVisibilityChange() {
//   if (document.hidden) {
//     function a(){document.title="Come back!",setTimeout(b,1e3)}function b(){document.title="😁",setTimeout(a,1e3)}a();
//   } else {
    
//   }
// }

// document.addEventListener("visibilitychange", handleVisibilityChange, false);


function visibilityChange(actionFunction){

  window.focus(); /* window.onfocus   = infoIn;  */

  var hidden = "hidden";

  /* Standards: */
  if (hidden in document){
      document.addEventListener("visibilitychange", actionFunction);
  }
  else if ((hidden = "mozHidden") in document){
      document.addEventListener("mozvisibilitychange", actionFunction);
  }
  else if ((hidden = "webkitHidden") in document){
      document.addEventListener("webkitvisibilitychange", actionFunction);
  }
  else if ((hidden = "msHidden") in document){
      document.addEventListener("msvisibilitychange", actionFunction);
  }
  /* IE 9 and lower: */
  else if ("onfocusin" in document){
      document.onfocusin = document.onfocusout = actionFunction;
  }
  /* All others: */
  else{
      window.onpageshow = window.onpagehide
      = window.onfocus = window.onblur = actionFunction;  
  }
}

var comeBackAlerts  = (function () {
  var oldTitle                    = document.title;
  var msg                         = "👋";
  var intervalId;
  var blink       = function(){
          intervalId = setInterval( function() { 
              /* document.title = document.title == msg ? ' ' : msg; */ 
              if(document.title == msg){
                  document.title = oldTitle;
              }
              else{
                  document.title = msg;
              }
          }, 1000);
      };
  var clear       = function() {
      clearInterval(intervalId);
      document.title              = oldTitle;
      window.onmousemove          = null;
      window.onmouseout           = null;
      intervalId                  = null;
  };
  return function () {
      if (!intervalId) {
          blink();
          window.onmousemove      = clear;
      }
  };
}());

visibilityChange(comeBackAlerts);