declare namespace IBlog {
  interface Author {
    email: string
    username: string
  }

  interface User extends Author {
    id: number
    active: boolean
    staff: boolean
  }

  interface Tag {
    id: number
    name: number
    slug: string
  }

  interface Post {
    id: number
    title: string
    slug: string | string[]
    publish_at: string
    
    author: Author
  }
}

export default IBlog