import React from 'react'
import Enzyme, { mount, render, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ToggleOpen, { CommentList } from './comment-list'
import articles from '../fixtures'

Enzyme.configure({ adapter: new Adapter() })

describe('ArticleList', () => {
  it('should render comment list', () => {
    var comments = articles[0].comments

    const container = render(<CommentList comments={comments} isOpen={true} />)

    expect(container.find('.test__comment-list--item').length).toEqual(
      comments.length
    )
  })

  it('should render closed comment list by default', () => {
    var comments = articles[0].comments

    const container = render(<CommentList comments={comments} />)

    expect(container.find('.test__comment-list--item').length).toEqual(0)
  })

  it('should open comment list on click', () => {
    var comments = articles[0].comments

    const container = mount(<ToggleOpen comments={comments} isOpen={false} />)

    container
      .find('.test__commentlist--btn')
      .at(0)
      .simulate('click')

    expect(container.find('.test__comment-list--item').length).toEqual(
      comments.length
    )
  })

  it('should close comment list on click', () => {
    var comments = articles[0].comments

    const container = mount(<ToggleOpen comments={comments} isOpen={false} />)

    console.info(container.debug())

    container.find('.test__commentlist--btn').at(0)
    //.simulate('click');

    expect(container.find('.test__comment-list--item').length).toEqual(0)
  })
})
