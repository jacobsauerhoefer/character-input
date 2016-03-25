/*=============================================
=            Animated Input Plugin            =
=============================================*/

var animatedCharacterInput = (function() {
  'use strict';

  var animatedCharacterInput = {
    init: function(animation) {

      const $input = $('#textInput');
      var storedText = "";
      
      var keyDowns = Rx.Observable.fromEvent($input, 'keydown');
      var inputChange = Rx.Observable.fromEvent($('#textInput'), 'select');

      var actions = Rx.Observable
          .merge(keyDowns)
          .filter((function() {
              var keysPressed = {};
              return function(e) {

                  // filter logic here maybe

                  return e;
                
              };
          })());

      keyDowns.subscribe(function(e) {
          // console.log(e);
          // console.log(e.type, e.key || e.which, e.keyIdentifier);
          var character = ""+e.keyIdentifier+"";
          var val = String.fromCharCode(parseInt(event.keyIdentifier.substr(2), 16)).toLowerCase();
          if(e.keyCode === 32) { val = "&nbsp"; }
          if(e.keyCode === 8) { 


            // $(".animatedInput div:last-child").remove();
            

            setTimeout( function() {

              $(".animatedInput").find("div:not(.start)").remove();
            for (var i = 0; i < e.target.value.length; i++) {
              var val = e.target.value[i];
              if(e.target.value[i] === " ") { val = "&nbsp;" }
              $(".animatedInput").append("<div class='animated'>"+val+"</div>");
            }
            }, 10);

          }
          else {
            
            if($(".animatedInput").find("div:not(.start)").length <= 24) {      
              $(".animatedInput div").eq(e.target.selectionStart).after("<div class='animated "+ animation +"'>"+val+"</div>");
            }

          }

      });

      inputChange.subscribe(function(e) {
        console.log(e);
        // setTimeout( function() {

        //       $(".animatedInput").find("div:not(.start)").remove();
        //     for (var i = 0; i < e.target.value.length; i++) {
        //       var val = e.target.value[i];
        //       if(e.target.value[i] === " ") { val = "&nbsp;" }
        //       $(".animatedInput").append("<div class='animated'>"+val+"</div>");
        //     }
        //     }, 10);
      });

    }
  };

  return animatedCharacterInput;
})();


var characterInputPrototype = Object.create(HTMLElement.prototype);
characterInputPrototype.createdCallback = function() {
  // this.textContent = "I'm an x-foo!";
  this.innerHTML = '<div class="animatedInput"><input id="textInput" type="text" maxlength="24"></input><div class="start"></div></div>'

  animatedCharacterInput.init(this.attributes[0].value);

};

characterInputPrototype.foo = function() {
  console.log('foo() called');
};

var XFoo = document.registerElement('character-input', {
  prototype: characterInputPrototype
});

/*=====  End of Animated Input Plugin  ======*/
