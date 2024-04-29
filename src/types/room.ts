import { ApiProperty } from '@nestjs/swagger'

export type RoomData = {
  roomName: string
  roomDescription: string
  roomPrice: string
  roomImage: string
}

export class RoomDataReturn {
  @ApiProperty({
    description: 'Name of a Room',
    example: 'Suite Master',
  })
  roomName: string
  @ApiProperty({
    description: 'Description of a Room',
    example: 'Ar Condicionado, Netflix, TV',
  })
  roomDescription: string
  @ApiProperty({
    description: 'Price of a Room',
    example: 'R$ 1.767,00',
  })
  roomPrice: string
  @ApiProperty({
    description: 'Image URL of a Room',
    example:
      'https://letsimage.s3.amazonaws.com/letsbook/193/quartos/63/fotoprincipal.jpg',
  })
  roomImage: string
}
