import BlogTypes from './blog'

// From https://github.com/Microsoft/TypeScript/issues/1940
// declare should be optional on type aliases and interfaces.
// declare type and declare interface are identical to type and interface
declare namespace API {
  interface Response {
    code: string
    result: any
  }
  
  interface BasicList {
    total: number
    pageSize: number
    pageNumber: number
    pageCount: number
  }
}

interface PostList extends API.BasicList {
  posts: BlogTypes.Post[]
}

export interface PostListResponse extends API.Response {
  result: PostList
}

export interface PostDetailResponse extends API.Response {
  result: BlogTypes.Post
}