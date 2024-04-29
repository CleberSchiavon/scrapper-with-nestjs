export const extractURLFromBackgroundStyle = backgroundImage => {
  const url = backgroundImage.match(/url\("([^"]+)"\)/)
  return url ? url[1] : null
}

export const parseAllRooms = allRooms => {
  return allRooms.map(room => {
    room.roomImage = extractURLFromBackgroundStyle(room.roomImage)
    return room
  })
}
