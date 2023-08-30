import * as dotenv from "dotenv";
import { NFTStorage } from "nft.storage"
import { filesFromPaths } from "files-from-path"

dotenv.config()

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY

async function main() {
  if (process.argv.length !== 3) {
    console.error(`usage: ${process.argv[0]} ${process.argv[1]} <directory-path>`)
  }
  const directoryPath = process.argv[2]
  const files = await filesFromPaths([directoryPath])
  const storage = new NFTStorage({ token: NFT_STORAGE_KEY })
  const cid = await storage.storeDirectory(files)
  const status = await storage.status(cid)
  const payload = {
    ...status,
    url: `https://${cid}.ipfs.nftstorage.link`
  }
  console.log(JSON.stringify(payload, null, 2))
}

main()
  .catch(console.error)