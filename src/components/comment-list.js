import React from 'react'
import Comment from './comment'
import commentListWithAccordion from '../decorators/comments-accordion'

class CommentList extends React.Component {
  render() {
    const { comments, isCommentsOpen } = this.props
    return (
      <div>
        <button
          name="showComments"
          onClick={this.handleBtnCommentClick}
          value={isCommentsOpen}
        >
          {isCommentsOpen ? 'close comments' : 'open comments'}
        </button>

        {isCommentsOpen && (
          <div className="commentList">
            <h3> Comments: </h3>
            <ul>
              {comments &&
                comments.map((element) => {
                  return <Comment key={element.id} comment={element} />
                })}
            </ul>
          </div>
        )}
      </div>
    )
  }

  handleBtnCommentClick = (event) => {
    event && event.target.value === 'false'
      ? this.props.toggleOpenCommentItem(this.props.articleId)
      : this.props.toggleOpenCommentItem()
  }
}

const accordion = commentListWithAccordion(CommentList)

export default accordion
