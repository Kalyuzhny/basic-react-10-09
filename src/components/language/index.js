import React, { Component } from 'react'
import PropTypes from 'prop-types'
class LanguageBar extends Component {
  static PropType = {
    languageChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <br />
        <button onClick={() => this.props.languageChange('en')}>eng</button>
        <button onClick={() => this.props.languageChange('ru')}>ru</button>
        <br />
        <br />
      </div>
    )
  }
}

export default LanguageBar
