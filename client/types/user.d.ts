declare namespace User {
  type Token = String

  interface Info {
    id: number
    username: string
    email: string
    active: boolean
    staff: boolean
  }
}

export default User