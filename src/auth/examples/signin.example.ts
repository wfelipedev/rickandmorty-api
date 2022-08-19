import { ApiProperty } from '@nestjs/swagger'

class User {
  @ApiProperty({ example: '7dc497a0-0c2b-4a11-8cde-6e731983dafb' })
  id: string

  @ApiProperty({ example: 'Felipe' })
  name: string
}

export class SigninExample {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkYzQ5N2EwLTBjMmItNGExMS04Y2RlLTZ...'
  })
  accessToken: string

  @ApiProperty()
  user: User
}
