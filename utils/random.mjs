export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

export const getHands = (userNum) => {
  const results = []
  let numList = [...Array(100).keys()]
  for (let i = 0; i < userNum; i++) {
    const targetIndex = getRandomInt(numList.length)
    results.push(numList[targetIndex])
    numList = numList.filter((n) => n !== targetIndex)
  }
  return results
}
