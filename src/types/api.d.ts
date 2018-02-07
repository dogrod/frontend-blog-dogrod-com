import IBlog from './blog'

declare namespace IResponse {
  interface BasicList {
    results: any[]
    total: number
    pageNumber: number
    pageSize: number
    pageCount: number
  }

  interface PostList extends BasicList {
    results: IBlog.Post[]
  }

  interface PostDetail extends IBlog.Post {}
}