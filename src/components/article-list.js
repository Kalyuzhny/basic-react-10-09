import React, { Component } from 'react'
import Article from './article'
import accordion from '../decorators/accordion'

class ArticleList extends Component {
  render() {
    return <ul>{this.body}</ul>
  }

  get body() {
    const {
      toggleOpenItem,
      toggleCloseItem,
      toggleOpenCommentItem,
      toggleCloseCommentItem,
      openItemId,
      openItemIdForComment,
      articles
    } = this.props
    return articles.map((article) => (
      <li key={article.id}>
        <Article
          article={article}
          isOpen={openItemId === article.id}
          isCommentsOpen={openItemIdForComment === article.id}
          toggleOpen={toggleOpenItem}
          toggleClose={toggleCloseItem}
          toggleCommentOpen={toggleOpenCommentItem}
          toggleCommentClose={toggleCloseCommentItem}
        />
      </li>
    ))
  }
}

const ArticleListWithAccordion = accordion(ArticleList)

export default ArticleListWithAccordion
