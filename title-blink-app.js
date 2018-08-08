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