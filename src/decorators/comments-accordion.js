import React from 'react'

export default (OriginalComponent) =>
  class DecoratedComponent extends React.Component {
    state = {
      openItemIdForComment: ''
    }

    toggleOpenCommentItem = (openItemIdForComment) =>
      this.setState({ openItemIdForComment: openItemIdForComment })
    toggleCloseCommentItem = () => this.setState({ openItemIdForComment: null })

    render() {
      return (
        <OriginalComponent
          {...this.props}
          {...this.state}
          isCommentsOpen={
            this.state.openItemIdForComment === this.props.articleId
          }
          toggleOpenCommentItem={this.toggleOpenCommentItem}
          toggleCloseCommentItem={this.toggleCloseCommentItem}
        />
      )
    }
  }
