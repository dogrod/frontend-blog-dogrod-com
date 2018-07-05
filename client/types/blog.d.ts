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
    publish_at: string
    content: string

    author: Author
    tags: string[]
    category: string
  }
}

export default Blog