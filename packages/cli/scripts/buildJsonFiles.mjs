import * as fs from "node:fs/promises"
import * as util from "util"
import printf from "printf"


async function exists(f) {
  try {
    await fs.stat(f)
    return true
  } catch {
    return false
  }
}

async function writeJsonFile(filePath, content) {
  let jsonData

  if (typeof content === 'object') {
    jsonData = JSON.stringify(content, null, 0)
  } else if (typeof content === 'string') {
    jsonData = content
  } else {
    throw new Error("Unhandled content type")
  }

  await fs.writeFile(filePath, jsonData)
}

// const writeJsonFile = (tokenId)
// bafybeie77stxzaguz2t3wrp6y422v2kujse4nxyqkdqnakkmkxthkllige
// https://bafybeie77stxzaguz2t3wrp6y422v2kujse4nxyqkdqnakkmkxthkllige.ipfs.nftstorage.link/ipfs/bafybeie77stxzaguz2t3wrp6y422v2kujse4nxyqkdqnakkmkxthkllige/theletterofarist00thacuoft-0000.webp
async function main() {
  // you'll probably want more sophisticated argument parsing in a real app
  if (process.argv.length !== 9) {
    console.error(`usage: ${process.argv[0]} ${process.argv[1]} <title> <pattern> <start-id> <end-id> <token-id> <cid> <directory-path>`)
    process.exit(1)
  }
  const title = process.argv[2]
  const filePattern = process.argv[3]
  const startId = +process.argv[4]
  const endId = +process.argv[5]
  const startTokenId = +process.argv[6]
  const cid = process.argv[7].replace(/['"]+/g, '')
  const outputDirectory = process.argv[8]
  const link = `https://%s.ipfs.nftstorage.link/ipfs/%s/${filePattern}`

  // fs.mk
  if (!await exists(outputDirectory)) {
    console.info("Creating:", outputDirectory)
    await fs.mkdir(outputDirectory)
  }

  let currId = startId
  let tokenId = startTokenId

  while (currId < endId) {
    const metadata = {
      name: title,
      description: printf("Page %d", currId + 1),
      image: printf(link, cid, cid, currId)
    }

    await writeJsonFile(`${outputDirectory}/${tokenId++}.json`, metadata)
    currId++
  }
}

main()
  .catch(console.error)