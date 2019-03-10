import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { deleteArticle, loadArticleById } from '../../ac'
import CommentList from '../comment-list'
import './style.css'
import Loader from '../common/loader'
import { articleSelector } from '../../selectors'
import { Consumer as TranslationConsumer } from '../../contexts/translation'

class Article extends PureComponent {
  static propTypes = {
    article: PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string
    }),
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  }

  state = {
    hasError: false
  }

  componentDidCatch(err) {
    console.log('---', err)
    this.setState({
      hasError: true
    })
  }

  componentDidMount() {
    const { article, id, loadArticleById } = this.props

    if (!article || !article.text) loadArticleById(id)
  }

  render() {
    const { article, isOpen } = this.props
    if (!article) return null
    return (
      <div>
        <h3>
          {article.title}
          <button onClick={this.handleClick} className="test__article--btn">
            <TranslationConsumer>
              {(translation) =>
                isOpen ? translation.article_close : translation.article_open
              }
            </TranslationConsumer>
          </button>
          <button onClick={this.handleDelete}>
            <TranslationConsumer>
              {(translation) => translation.article_delete}
            </TranslationConsumer>
          </button>
        </h3>
        <CSSTransition
          transitionName="article"
          transitionAppear
          transitionEnterTimeout={500}
          transitionAppearTimeout={1000}
          transitionLeaveTimeout={300}
        >
          {this.body}
        </CSSTransition>
      </div>
    )
  }

  handleDelete = () => {
    const { article, deleteArticle } = this.props
    deleteArticle(article.id)
  }

  handleClick = () => this.props.toggleOpen(this.props.article.id)

  get body() {
    const { isOpen, article } = this.props
    if (!isOpen) return null
    if (this.state.hasError) return <div>Some Error in this article</div>
    if (article.loading) return <Loader />

    return (
      <section className="test__article--body">
        {article.text}
        <CommentList article={article} />
      </section>
    )
  }
}

export default connect(
  (state, props) => ({
    article: articleSelector(state, props)
  }),
  { deleteArticle, loadArticleById }
)(Article)
