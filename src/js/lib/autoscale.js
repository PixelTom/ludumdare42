(function(){
  var canvas;

  function AutoScale() {
    var game = document.getElementById( 'game' )
    game.classList.add( 'autoscale' )

    canvas = game.children[0]

    window.addEventListener( 'resize', autoScaleCanvas )
    autoScaleCanvas()
  }

  function autoScaleCanvas() {
    var autoWidthClass = 'autowidth'
    var wHeight = window.innerHeight
    var cHeight = canvas.offsetHeight

    if (cHeight >= wHeight) {
      canvas.classList.remove( autoWidthClass )
    } else {
      canvas.classList.add( autoWidthClass )
    }
  }

  module.exports = AutoScale
})()