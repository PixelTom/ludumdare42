const _ = require('lodash')
const properties = require('../properties')

let game
let canvas

class InputHelper {
  constructor( canvasEl, gameObj ) {
    game = gameObj
    canvas = canvasEl

    this.dragTarget = null
    this.mouseDown = false

    // position that the current mouse is relative to the canvas stage coordinates
    this.position = {
      x: null,
      y: null,
    }

    window.addEventListener('mousedown', (e) => {
      this.mouseDown = true
      this.position.x = this.scaledX( e.clientX )
      this.position.y = this.scaledY( e.clientY )
    } )

    window.addEventListener('mouseup', () => {
      if (this.dragTarget) {
        this.dragTarget.customInput.onDragStop.dispatch( this.dragTarget, this.position, this.position.x, this.position.y )
      }
      this.mouseDown = false
      this.position.x = null
      this.position.y = null
      this.dragTarget = null
    } )

    window.addEventListener('mousemove', (e) => {
      if (!this.mouseDown) return
      this.position.x = this.scaledX( e.clientX )
      this.position.y = this.scaledY( e.clientY )
      if (this.dragTarget) {
        this.dragTarget.customInput.onDragUpdate.dispatch( this.dragTarget, this.position, this.position.x, this.position.y )
      }
    } )
  }

  scaledX( x ) {
    return x * canvas.clientWidth / properties.size.x
  }
  scaledY( y ) {
    return y * canvas.clientHeight / properties.size.y
  }

  makeDraggable( item ) { // recreate phaser drag events
    if (!item) {
      return
    } else if (!item.customInput) {
      item.customInput = {}
    }

    item.customInput.draggable = true
    item.customInput.onDragStart = new Phaser.Signal()
    item.customInput.onDragStop = new Phaser.Signal()
    item.customInput.onDragUpdate = new Phaser.Signal()
    item.events.onInputDown.add( function (obj) {
      if (item.customInput.draggable) {
        this.dragTarget = obj
        item.customInput.onDragStart.dispatch( this.dragTarget, this.position, this.position.x, this.position.y )
      }
    }, this )
  }
}

module.exports = InputHelper
