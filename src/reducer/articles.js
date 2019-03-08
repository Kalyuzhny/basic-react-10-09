import {
  DELETE_ARTICLE,
  ADD_COMMENT,
  LOAD_ALL_ARTICLES,
  SUCCESS,
  START,
  LOAD_ARTICLE
} from '../constants'
import { arrToMap } from './utils'
import { Record } from 'immutable'

const ArticleRecord = Record({
  title: null,
  id: null,
  text: null,
  date: null,
  loading: false,
  comments: []
})

const ReducerRecord = Record({
  entities: arrToMap([], ArticleRecord),
  loading: false,
  loaded: false,
  error: null
})

export default (articlesState = new ReducerRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case DELETE_ARTICLE:
      return articlesState.deleteIn(['entities', payload.id])

    case ADD_COMMENT:
      return articlesState.updateIn(
        ['entities', payload.articleId, 'comments'],
        (comments) => comments.concat(randomId)
      )

    case LOAD_ALL_ARTICLES + START:
      return articlesState.set('loading', true)

    case LOAD_ALL_ARTICLES + SUCCESS:
      response[0].comments = []
      return articlesState
        .set('entities', arrToMap(response, ArticleRecord))
        .set('loading', false)
        .set('loaded', true)

    case LOAD_ARTICLE + START:
      return articlesState.setIn(['entities', payload.id, 'loading'], true)

    case LOAD_ARTICLE + SUCCESS:
      response.comments = []
      return articlesState.setIn(
        ['entities', payload.id],
        new ArticleRecord(response)
      )

    default:
      return articlesState
  }
}
