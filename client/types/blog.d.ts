interface WithSlug {
  slug: string
}

declare namespace Blog {
  interface Author {
    email: string
    username: string
  }

  interface Tag extends WithSlug {
    name: string
  }

  interface Category extends WithSlug {
    title: string
  }

  interface Post {
    id: number
    title: string
    slug: string
    publishAt: string
    content: string
    
    author: Author
    tags: string[]
    category: Category
    coverImage: string

    likes: number
    comments: number
  }
}

export default Blog