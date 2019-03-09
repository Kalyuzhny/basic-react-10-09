import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import Comment from '../comment'
import CommentForm from '../comment-form'
import toggleOpen from '../../decorators/toggleOpen'
import './style.css'
import { loadComments } from '../../ac'
import { connect } from 'react-redux'
import {
  commentListSelector,
  commentsLoadingSelector
} from '../../selectors/index'
import Loader from '../common/loader'

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
      comments,
      loading
    } = this.props

    if (!isOpen) return null

    console.info('---Loading  ' + loading)
    if (loading) return <Loader />

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

  componentDidUpdate(oldProps) {
    const { fetchData, isOpen } = this.props
    console.info('---- START FETCH')
    if (!oldProps.isOpen && isOpen)
      fetchData && fetchData(this.props.article.id)
  }

  get comments() {
    const { comments } = this.props

    return (
      <ul>
        {comments.map((id) => (
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
    return {
      comments: commentListSelector(state),
      loading: commentsLoadingSelector(state)
    }
  },
  { fetchData: loadComments }
)(toggleOpen(CommentList))
