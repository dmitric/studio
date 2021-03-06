import React, { Component } from 'react'

import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";

export default class StudioMenu extends Component {
  
  handleShaderClick (e) {
    this.props.shaderManager.selectByName(e.target.textContent)
    if (this.props.debug) {
      this.props.debugToaster.show({ message: `Shader set: ${e.target.textContent}`, iconName: 'style'})
    }
  }

  handlePaletteClick (e) {
    this.props.paletteManager.selectByName(e.target.textContent)
    if (this.props.debug) {
      this.props.debugToaster.show({ message: `Palette set: ${e.target.textContent}`, iconName: 'tint'})
    }
  }

  render () {

    let shadersHtml, palettesHtml

    const shaders = this.props.shaderManager.getItems()
    const palettes = this.props.paletteManager.getItems()
    
    if (shaders.length) {
      shadersHtml = (
        <MenuItem
            useSmartPositioning={false}
            iconName='style'
            text={this.props.shaderManager.current().name}>
          <MenuDivider title='More Shaders' />
          {shaders.map((sh) => {
            return <MenuItem text={sh.name} key={sh.name}
                      iconName={this.props.shaderManager.current().name === sh.name ? 'tick': 'blank'}
                      onClick={this.handleShaderClick.bind(this)} />
          })}
        </MenuItem>
      )
    } else {
      shadersHtml = <MenuItem text="No shaders" />
    }

    if (palettes.length) {
      palettesHtml = (
        <MenuItem
            useSmartPositioning={false}
            iconName='tint'
            text={this.props.paletteManager.current().name}>
          <MenuDivider title='More Palettes' />
          {palettes.map((pp, index) => {
            return <MenuItem text={pp.name} key={pp.name}
                      iconName={this.props.paletteManager.current().name === pp.name ? 'tick': 'blank'}
                      onClick={this.handlePaletteClick.bind(this)} />
          })}
        </MenuItem>
      )
    } else {
      palettesHtml = <MenuItem text="No palettes" />
    }

    const fullScreenMenu = this.props.fullScreen ?  ( <MenuItem useSmartPositioning={false} iconName='minimize' text='Exit Full Screen'
            onClick={this.props.toggleFullScreen} label='⌘F' /> ) :  (
                <MenuItem useSmartPositioning={false} iconName='fullscreen' text='Full Screen'
                  onClick={this.props.toggleFullScreen} label='⌘F' />
              )

    return (
      <div className='StudioMenu'>
        <Menu useSmartPositioning={false}>
          <MenuDivider title='Shader' />
          {shadersHtml}
          <MenuDivider title='Palette' />
          {palettesHtml}
          <MenuDivider title='Playback' />
          <MenuItem useSmartPositioning={false} iconName='layout-grid' text='Resolution'>
            <MenuItem text='Increase' label='Up' onClick={e => {
                this.props.resolutionManager.up()
                if (this.props.debug) {
                  this.props.debugToaster.show({
                    message: `Resolution increased to ${this.props.resolutionManager.current() }`, iconName: 'arrow-up'
                  })
                }
              }
            } />
            <MenuItem text='Decrease' label='Down' onClick={e => {
                this.props.resolutionManager.down()
                if (this.props.debug) {
                  this.props.debugToaster.show({
                    message: `Resolution decreased to ${this.props.resolutionManager.current() }`, iconName: 'arrow-down'
                  })
                }
              }
            } />
          </MenuItem>
          <MenuItem useSmartPositioning={false} iconName='contrast' text='Contrast'>
            <MenuItem text='Increase' label='⌘Up' onClick={e => {
                this.props.contrastManager.up()
                if (this.props.debug) {
                  this.props.debugToaster.show({
                    message: `Contrast increased to ${this.props.contrastManager.current() }`, iconName: 'arrow-up'
                  })
                }
              }
            }/>
            <MenuItem text='Decrease' label='⌘Down' onClick={e => {
                this.props.contrastManager.down()
                if (this.props.debug) {
                  this.props.debugToaster.show({
                    message: `Contrast decreased to ${this.props.contrastManager.current() }`, iconName: 'arrow-down'
                  })
                }
              }
            } />
          </MenuItem>
          <MenuItem iconName='full-circle' text='Toggle fill'
            label='⌘D' onClick={this.props.toggleFill} />
          <MenuItem iconName='minus' text='Toggle stroke'
            label='⌘G' onClick={this.props.toggleStroke} />
          <MenuDivider title='Debug' />
          <MenuItem iconName='download' text='Save'
            label='⌘S' onClick={this.props.saveImage} />
          {fullScreenMenu}
          <MenuItem iconName='control' text='Toggle controls'
            onClick={this.props.toggleDebug} label='⌘H' />
          <MenuDivider title='Contribute' />
          <MenuItem iconName='git-repo' target='_blank' href='https://github.com/dmitric/studio' text='View on Github' />
          <MenuItem iconName='dollar' target='_blank' text='Donate' href='https://cash.me/$dlc' />
        </Menu>
      </div>
    )
  }
}
