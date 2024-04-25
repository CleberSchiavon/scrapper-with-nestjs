import { ApiProperty } from "@nestjs/swagger";

export type RoomData = {
  name: string;
  description: string;
  price: string;
  image: string;
};

export class RoomDataReturn {
  @ApiProperty({
    description: "Name of a Room",
    example: "Suite Master",
  })
  name: string;
  @ApiProperty({
    description: "Description of a Room",
    example: "Ar Condicionado, Netflix, TV",
  })
  description: string;
  @ApiProperty({
    description: "Price of a Room",
    example: "R$ 1.767,00",
  })
  price: string;
  @ApiProperty({
    description: "Image URL of a Room",
    example:
      "https://letsimage.s3.amazonaws.com/letsbook/193/quartos/63/fotoprincipal.jpg",
  })
  image: string;
}
