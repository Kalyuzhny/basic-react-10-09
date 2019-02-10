import React from 'react'

class Comment extends React.PureComponent {
  render() {
    const { comment } = this.props
    return <li>{comment.text}</li>
  }
}

export default Comment
