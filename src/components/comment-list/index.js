import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import Comment from '../comment'
import CommentForm from '../comment-form'
import toggleOpen from '../../decorators/toggleOpen'
import './style.css'
import { loadComments } from '../../ac'
import { connect } from 'react-redux'
import { articleCommentsSelector } from '../../selectors/index'

class CommentList extends Component {
  static propTypes = {
    article: PropTypes.object,

    //from toggleOpen decorator
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  }

  render() {
    const { isOpen, toggleOpen } = this.props
    const text = isOpen ? 'hide comments' : 'show comments'
    return (
      <div>
        <button onClick={toggleOpen} className="test__comment-list--btn">
          {text}
        </button>
        <CSSTransition
          transitionName="comments"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.getBody()}
        </CSSTransition>
      </div>
    )
  }

  getBody() {
    const {
      article: { id },
      isOpen,
      comments
    } = this.props
    console.info('--- Comments from list: ' + comments)
    if (!isOpen) return null

    return (
      <div className="test__comment-list--body">
        {comments.length ? (
          this.comments
        ) : (
          <h3 className="test__comment-list--empty">No comments yet</h3>
        )}
        <CommentForm articleId={id} />
      </div>
    )
  }

  componentDidMount() {
    const { fetchData } = this.props
    fetchData && fetchData(this.props.article.id)
  }

  get comments() {
    return (
      <ul>
        {this.props.comments.map((id) => (
          <li key={id} className="test__comment-list--item">
            <Comment id={id} />
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(
  (state) => {
    console.log('---', 'comment list connect' + articleCommentsSelector(state))
    return {
      comments: articleCommentsSelector(state)
    }
  },
  { fetchData: loadComments }
)(toggleOpen(CommentList))
