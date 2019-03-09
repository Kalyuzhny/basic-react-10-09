import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { commentsOnPageSelector, totalCommentsSelector } from '../../selectors'
import { loadPages } from '../../ac/index'
import { NavLink } from 'react-router-dom'

class Pagination extends Component {
  static propTypes = {
    commentsOnPage: PropTypes.array.isRequired,
    fetchData: PropTypes.func,
    id: PropTypes.string
  }

  render() {
    return (
      <div>
        {this.pagingMenu}
        <ul>{this.body}</ul>
      </div>
    )
  }

  get body() {
    const { commentsOnPage } = this.props
    console.info('--- CPMMENTS', commentsOnPage)
    return commentsOnPage.map((comment) => (
      <li key={comment.id} className="test__article-list--item">
        {comment.text}
      </li>
    ))
  }

  get pagingMenu() {
    const { totalComments } = this.props
    if (!totalComments) return null

    const remainder = totalComments % 5
    let pagesCount = (totalComments - remainder) / 5
    if (remainder !== 0) {
      pagesCount++
    }
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }
    return (
      <div>
        {pages.map((pageNr) => (
          <NavLink
            key={pageNr}
            to={`/pages/${pageNr}`}
            activeStyle={{ color: 'red' }}
          >
            <div onClick={() => this.handleOnClick(pageNr)}>.{pageNr}.</div>
          </NavLink>
        ))}
      </div>
    )
  }

  handleOnClick = (value) => {
    const { fetchData, match } = this.props
    console.log('----COMPONENT ONCLICK, ID: ', match.params.id, value)
    fetchData && fetchData(5, value)
  }

  componentDidMount() {
    const { fetchData, match } = this.props
    console.log('----COMPONENT DID MOUNT, ID: ', match.params.id)
    fetchData && fetchData(5, match.params.id)
  }
}

export default connect(
  (state, props) => {
    console.log('---', 'COMMENTS connect')
    return {
      commentsOnPage: commentsOnPageSelector(state),
      totalComments: totalCommentsSelector(state)
    }
  },
  { fetchData: loadPages }
)(Pagination)
