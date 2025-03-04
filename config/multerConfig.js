import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to get destination folder dynamically
const getUploadFolder = (fieldname) => {
  let folderName = 'default' // Default folder in case of an unknown field
  if (fieldname === 'cardImage') {
    folderName = 'card-images'
  } else if (fieldname === 'productImages') {
    folderName = 'product-images'
  } else {
    folderName = fieldname
  }

  // Ensure uploads directory exists
  const uploadDir = path.join(
    __dirname,
    `../public/images/products/${folderName}/`,
  )

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  return uploadDir
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, getUploadFolder(file.fieldname)) // Set folder dynamically based on fieldname
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

// Multer Upload Middleware
const upload = multer({ storage })

export default upload
