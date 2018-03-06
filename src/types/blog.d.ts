export namespace IBlog {
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
    name: number
    slug: string
  }

  interface Category {
    title: string
    slug: string
  }

  interface Post {
    id: number
    title: string
    slug: string | string[]
    publish_at: string
    content: string
    
    author: Author
    tags: Tag[]
    category?: Category
  }
}

export default IBlog