import IBlog from './blog'

declare namespace IResponse {
  interface BasicList {
    total: number
    pageNumber: number
    pageSize: number
    pageCount: number
  }

  interface PostList extends BasicList {
    posts: IBlog.Post[]
  }

  interface PostDetail extends IBlog.Post {}

  interface CommonResponse {
    code: string
    result: any
  }

  interface PostListResponse extends CommonResponse {
    result: PostList
  }

  interface PostDetailResponse extends CommonResponse {
    result: PostDetail
  }
}