//decorator === HOC === Higher Order Component
import React from 'react'

export default (OriginalComponent) =>
  class DecoratedComponent extends React.Component {
    state = {
      openItemId: null,
      openItemIdForComment: null
    }

    toggleOpenItem = (openItemId) => this.setState({ openItemId })
    toggleCloseItem = () => this.setState({ openItemId: null })

    toggleOpenCommentItem = (openItemIdForComment) =>
      this.setState({ openItemIdForComment })
    toggleCloseCommentItem = () => this.setState({ openItemIdForComment: null })

    render() {
      return (
        <OriginalComponent
          {...this.props}
          {...this.state}
          toggleOpenItem={this.toggleOpenItem}
          toggleCloseItem={this.toggleCloseItem}
          toggleOpenCommentItem={this.toggleOpenCommentItem}
          toggleCloseCommentItem={this.toggleCloseCommentItem}
        />
      )
    }
  }
