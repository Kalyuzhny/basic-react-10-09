import React, { PureComponent } from 'react'
import CommentList from './comment-list'

class Article extends PureComponent {
  render() {
    console.log('---', 'rendering')
    const { article, isOpen } = this.props
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
        <CommentList articleId={article.id} comments={article.comments} />
      </div>
    )
  }

  setTitleRef = (titleRef) => console.log(titleRef)

  handleBtnClick = (event) => {
    event && event.target.value === 'false'
      ? this.props.toggleOpen(this.props.article.id)
      : this.props.toggleClose()
  }
}

export default Article
