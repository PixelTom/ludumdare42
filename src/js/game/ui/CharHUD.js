
      // HP: 5,
      // MAX_HP: 5,
      // ARMOUR: 5,

const _ = require('lodash')
const properties = require('../properties')

let game


const COLOR = {
  health: 0xff3636,
  poison: 0x36ff90,
  corrupt: 0x9e36ff,
  burn: 0xffa836,
}


class CharHUD extends Phaser.Group {
  constructor( character, opt ) {
    game = character.game
    super( game.world )

    this.options = _.defaults( {
      healthX: -60,
      healthY: -250,
      resourceX: -60,
      resourceY: -280,
      resourceIcon: 'armor',
      resourceTarget: 'ARMOUR',
    }, opt )

    this.data = character.data
    this.x = character.x
    this.y = character.y

    this.metrics = []

    // character.parent.add( this ) // this doesn't work, because character is not added to world yet
    game.world.add( this )


    // List of props and types of bars
    if (this.data.HP) {
      const healthBar = this.addBar( {
        prop: 'HP',
        limit: this.data.MAX_HP,
        color: COLOR.health,
        x: this.options.healthX,
        y: this.options.healthY,
      } )
      this.metrics.push( healthBar )
    }

    if (this.data.ARMOUR) {
      const armorTally = this.addTally( {
        prop: 'ARMOUR',
        img: 0x949494, // temp
        x: this.options.resourceX,
        y: this.options.resourceY,
      } )
      this.metrics.push( armorTally )
    }

    if (this.data.AMMO) {
      const ammoTally = this.addTally( {
        prop: 'AMMO',
        img: 0x36eaff, // temp
        x: this.options.resourceX,
        y: this.options.resourceY,
      } )
      this.metrics.push( ammoTally )
    }

    if (this.data.ITEMS) {
      const itemTally = this.addTally( {
        prop: 'ITEMS',
        img: 0xfff336, // temp
        x: this.options.resourceX,
        y: this.options.resourceY,
        vertical: true,
      } )
      this.metrics.push( itemTally )
    }
  }


  // watch for prop changes
  preUpdate() {
    for (let metric of this.metrics) {
      const curValue = this.data[ metric.prop ]
      const barValue = metric.value
      if (barValue === curValue) continue // skip if the value hasn't changed
      // debugger
      // console.log('METRIC CHANGED!!!', metric, this.data)
      switch (metric.type) {
        case 'bar':
          this.updateBar( metric, curValue )
          break;
        case 'tally':
          this.updateTally( metric, curValue )
          break;
        default:
          metric.value = curValue
          break;
      }
    }
  }




  addBar( { prop, limit, color, x, y } ) {
    const barWidth = 100
    const barHeight = 20
    // const current = this.data[ prop ]

    const bar = game.make.group()
    bar.x = x
    bar.y = y

    const barBG = game.make.graphics(0, 0)
    barBG.beginFill(0x000000)
    barBG.fillAlpha = 0.8
    barBG.drawRect(0, 0, barWidth, barHeight)
    barBG.endFill()

    const barMeter = game.make.graphics(0, 0)
    barMeter.beginFill(color)
    barMeter.drawRect(0, 0, barWidth, barHeight)
    barMeter.endFill()

    bar.addMultiple( [ barBG, barMeter ] )
    this.add( bar )

    return {
      type: 'bar',
      prop: prop,
      value: limit, // set the current value to max, and let preUpdate set to current value
      limit: limit,
      bar: barMeter,
    }
  }

  updateBar( metric, value ) {
    let diff = value - metric.value

    const bar = metric.bar
    bar.scale.x = value / metric.limit
    metric.value = value

    if (diff) {
      if (diff > 0) {
        diff = '+' + diff
      } else {
        diff = diff.toString()
      }
      this.statusText( diff, {
        x: bar.x + bar.width * bar.scale.x + 50,
        y: bar.y,
        parent: bar.parent,
        color: COLOR.health,
      } )
    }
  }


  addTally( { prop, img, x, y, vertical } ) {
    const group = game.make.group()

    const newIcon = function() {
      // temp, should be image
      const icon = game.make.graphics(0, 0)
      icon.beginFill( img )
      icon.drawRect(0, 0, 20, 20)
      icon.endFill()
      return icon
    }

    const createIcon = function() {
      const padding = 5
      const icon = newIcon()

      let posX = 0
      let posY = 0

      if (group.children.length) {
        const lastChild = group.getChildAt( group.children.length - 1 )
        if (vertical) {
          posY = lastChild.y - lastChild.height - padding
        } else {
          posX = lastChild.x + lastChild.width + padding
        }
      }

      icon.x = posX
      icon.y = posY
      group.add( icon )
    }

    const removeIcon = function() {
      if (group.children.length) {
        group.removeChildAt( group.children.length - 1 )
      }
    }

    const tallyManager = {
      group: group,
      create: createIcon,
      remove: removeIcon,
    }
    tallyManager.group.x = x
    tallyManager.group.y = y

    this.add( group )

    return {
      type: 'tally',
      prop: prop,
      value: 0, // set the current value to max, and let preUpdate set to current value
      tally: tallyManager,
      icon: newIcon,
    }
  }

  updateTally( metric, value ) {
    let diff = value - metric.value

    if ( diff > 0 ) { // add tally
      for ( let i=0; i<diff; i++ ) {
        metric.tally.create()
      }
    } else if ( diff < 0 ) { // remove tally
      for ( let i=0; i<-diff; i++ ) {
        if ( tallyCnt.children.length ) {
          metric.tally.remove()
        }
      }
    }

    metric.value = value

    if (diff && diff < 0) {
      const icon = metric.icon()
      this.statusIcon( icon, {
        x: metric.tally.group.x + metric.tally.group.children.length * icon.width + 50,
        y: metric.tally.group.y,
        parent: bar.parent,
      } )
    }
  }


  statusText( text, { x, y, parent, color } ) {
    const stat = game.make.text( x, y, text, {
      font: 'normal 30px "Press Start 2P"',
      fill: '#' + color.toString(16),
    })
    parent.add( stat )

    this.blipStatus( stat )
  }

  statusIcon( obj, { x, y, parent, color } ) {
    obj.x = x
    obj.y = y
    parent.add( obj )
    this.blipStatus( obj )
  }

  blipStatus( obj, duration = 500 ) {
    const tween = game.add.tween( obj ).to( { y: obj.y - 20 }, duration, 'Back' )
    tween.onComplete.add( () => {
      obj.destroy()
    } )
    tween.start()
  }
}

module.exports = CharHUD
