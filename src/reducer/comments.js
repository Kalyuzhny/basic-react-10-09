import {
  ADD_COMMENT,
  LOAD_ARTICLE_COMMENTS,
  SUCCESS,
  LOAD_PAGES
} from '../constants'
import { Record, OrderedMap } from 'immutable'
import { arrToMap } from './utils'

const CommentRecord = Record({
  id: null,
  text: null,
  user: null
})

const ReducerRecord = Record({
  entities: new OrderedMap({}),
  onpage: new OrderedMap({}),
  totalComments: null
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case ADD_COMMENT:
      return state.setIn(
        ['entities', randomId],
        new CommentRecord({
          ...payload.comment,
          id: randomId
        })
      )

    case LOAD_ARTICLE_COMMENTS + SUCCESS:
      return state.mergeIn(['entities'], arrToMap(response, CommentRecord))

    case LOAD_PAGES + SUCCESS:
      console.log(response.records)
      return state
        .set('onpage', arrToMap(response.records, CommentRecord))
        .set('totalComments', response.total)
    default:
      return state
  }
}
