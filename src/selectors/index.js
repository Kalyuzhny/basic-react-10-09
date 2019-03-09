import { createSelector } from 'reselect'

export const articlesMapSelector = (state) => state.articles.entities
export const articlesLoadingSelector = (state) => state.articles.loading
export const commentsLoadingSelector = (state) => state.comments.loading
export const commentsMapSelector = (state) => state.comments.entities
export const dateRangeSelector = (state) => state.filters.dateRange
export const selectedSelector = (state) => state.filters.selected

export const idSelector = (_, props) => props.id.id
export const articlesListSelector = createSelector(
  articlesMapSelector,
  (articlesMap) => articlesMap.valueSeq().toArray()
)

export const commentListSelector = createSelector(
  commentsMapSelector,
  (commentsMap) => commentsMap.valueSeq().toArray()
)

export const filtratedArticles = createSelector(
  articlesListSelector,
  selectedSelector,
  dateRangeSelector,
  (articles, selected, dateRange) => {
    const { from, to } = dateRange

    console.log('---', 'article list selector')

    const fileredArticles = articles.filter((article) => {
      const published = Date.parse(article.date)
      return (
        (!selected.length ||
          selected.find((selected) => selected.value === article.id)) &&
        (!from || !to || (published > from && published < to))
      )
    })
    console.log('----Filtrated articles: ' + fileredArticles)
    return fileredArticles
  }
)

export const createCommentSelector = () =>
  createSelector(commentListSelector, idSelector, (comments, id) => {
    return comments.filter((comment) => comment.id === id)[0]
  })
