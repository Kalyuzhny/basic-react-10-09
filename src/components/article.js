import React, { PureComponent } from 'react'
import CommentList from './comment-list'

class Article extends PureComponent {
  render() {
    console.log('---', 'rendering')
    const { article, isOpen, isCommentsOpen } = this.props
    return (
      <div>
        <div>
          <h3 ref={this.setTitleRef}>{article.title}</h3>
          <button onClick={this.handleBtnClick} value={isOpen}>
            {isOpen ? 'close' : 'open'}
          </button>
        </div>
        {isOpen && <section>{article.text}</section>}
        <br />
        <button
          name="showComments"
          onClick={this.handleBtnCommentClick}
          value={isCommentsOpen}
        >
          {isCommentsOpen ? 'close comments' : 'open comments'}
        </button>
        {isCommentsOpen && <CommentList comments={article.comments} />}
      </div>
    )
  }

  setTitleRef = (titleRef) => console.log(titleRef)

  handleBtnClick = (event) => {
    event && event.target.value === 'false'
      ? this.props.toggleOpen(this.props.article.id)
      : this.props.toggleClose()
  }

  handleBtnCommentClick = (event) => {
    event && event.target.value === 'false'
      ? this.props.toggleCommentOpen(this.props.article.id)
      : this.props.toggleCommentClose()
  }
}

export default Article
