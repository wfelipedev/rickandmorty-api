export class GetUserDTO {
  id: string
  avatar: string
  username: string
}

export class JWTUser {
  id: string
  name: string
}

export class AccessTokenDTO {
  accessToken: string
  user: JWTUser
}
