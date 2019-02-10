import React from 'react'
import Comment from './comment'

class CommentList extends React.Component {
  render() {
    const { comments } = this.props
    return comments ? (
      <div className="commentList">
        <h3> Comments: </h3>
        <ul>
          {comments.map((element) => {
            return <Comment key={element.id} comment={element} />
          })}
        </ul>
      </div>
    ) : (
      <div />
    )
  }
}

export default CommentList
