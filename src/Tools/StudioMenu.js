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

    const fullScreenMenu = this.props.fullScreen ?  ( <MenuItem iconName='minimize' text='Exit Full Screen'
            onClick={this.props.toggleFullScreen} label='⌘F' /> ) :  (
                <MenuItem iconName='fullscreen' text='Full Screen'
                  onClick={this.props.toggleFullScreen} label='⌘F' />
              )

    return (
      <div className='StudioMenu'>
        <Menu>
          <MenuDivider title='Shader' />
          {shadersHtml}
          <MenuDivider title='Palette' />
          {palettesHtml}
          <MenuDivider title='Playback' />
          <MenuItem iconName='layout-grid' text='Resolution'>
            <MenuItem text='Increase' label='Up' onClick={e => this.props.resolutionManager.up() } />
            <MenuItem text='Decrease' label='Down' onClick={e => this.props.resolutionManager.down() }/>
          </MenuItem>
          <MenuItem iconName='contrast' text='Contrast'>
            <MenuItem text='Increase' label='⌘Up' onClick={e => this.props.contrastManager.up() } />
            <MenuItem text='Decrease' label='⌘Down' onClick={e => this.props.contrastManager.down() } />
          </MenuItem>
          <MenuDivider title='Debug' />
          {fullScreenMenu}
          <MenuItem iconName='control' text='Toggle controls'
            onClick={this.props.toggleDebug} label='⌘H' />
        </Menu>
      </div>
    )
  }
}
