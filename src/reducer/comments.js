import { ADD_COMMENT, LOAD_COMMENTS, SUCCESS } from '../constants'
import { arrToMap } from './utils'
import { Record } from 'immutable'

const CommentRecord = Record({
  id: null,
  text: null,
  user: null,
  loading: false
})

const ReducerRecord = Record({
  comments: arrToMap([], CommentRecord),
  loading: false,
  loaded: false,
  error: null
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case ADD_COMMENT:
      return state.set(randomId, {
        ...payload.comment,
        id: randomId
      })
    case LOAD_COMMENTS + SUCCESS:
      console.info('-----' + LOAD_COMMENTS + SUCCESS + response)
      return arrToMap(response, CommentRecord)

    default:
      return state
  }
}
