import React, { Component } from 'react'

import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";

class StudioMenu extends Component {
  
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

    return (
      <div className='StudioMenu'>
        <Menu>
          <MenuDivider title='Shader' />
          {shadersHtml}
          <MenuDivider title="Palette" />
          {palettesHtml}
          <MenuDivider />
          <MenuItem text="Settings" iconName="cog" />
        </Menu>
      </div>
    )
  }
}

export default StudioMenu