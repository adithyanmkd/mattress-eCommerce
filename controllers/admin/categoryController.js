import path from 'path'
import fs from 'fs'

import Category from '../../models/catagoryModel.js'

// get category add page
const getAddCategory = (req, res) => {
  res.render('admin/pages/categories/AddCategory', {
    layout: 'layouts/admin-layout.ejs',
  })
}

// saving category into database
const postAddCategory = async (req, res) => {
  const { categoryName, description, croppedImage } = req.body

  // Validate required fields
  if (!categoryName || !description) {
    return res.status(400).render('admin/pages/categories/AddCategory', {
      layout: 'layouts/admin-layout.ejs',
      error: 'Category name and description are required',
    })
  }

  try {
    // Check if category already exists (case-insensitive)
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${categoryName}$`, 'i') },
    })

    if (existingCategory) {
      return res.status(409).render('admin/pages/categories/AddCategory', {
        layout: 'layouts/admin-layout.ejs',
        error: 'Category already exists',
        formData: { categoryName, description }, // Preserve form data
      })
    }

    // Handle image upload
    let imageData = {}
    if (req.files?.categoryImage) {
      const imgPath = req.files.categoryImage[0].path.replace(
        /.*\/public\//,
        '/',
      )
      imageData = {
        path: imgPath,
        alt: `${categoryName} image`,
      }
    } else if (croppedImage) {
      // Handle base64 cropped image
      const base64Data = croppedImage.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')
      const fileName = `category-${Date.now()}.png`
      const filePath = path.join(__dirname, '../public/uploads', fileName)

      await fs.promises.writeFile(filePath, buffer)
      imageData = {
        path: `/uploads/${fileName}`,
        alt: `${categoryName} image`,
      }
    } else {
      return res.status(400).render('admin/pages/categories/AddCategory', {
        layout: 'layouts/admin-layout.ejs',
        error: 'Category image is required',
        formData: { categoryName, description },
      })
    }

    // Create new category
    const newCategory = new Category({
      name: categoryName,
      description,
      image: imageData,
    })

    await newCategory.save()

    // Redirect with success message
    req.flash('success', 'Category added successfully')
    res.redirect('/admin/categories')
  } catch (error) {
    console.error('Error in postAddCategory:', error)

    // Handle specific errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).render('admin/pages/categories/AddCategory', {
        layout: 'layouts/admin-layout.ejs',
        error: errors.join(', '),
        formData: { categoryName, description },
      })
    }

    res.status(500).render('admin/pages/categories/AddCategory', {
      layout: 'layouts/admin-layout.ejs',
      error: 'An unexpected error occurred. Please try again.',
      formData: { categoryName, description },
    })
  }
}

// list all categories
const getCategoryList = async (req, res) => {
  let searchValue = req.query.search || '' // accessing search value from url

  const page = parseInt(req.query.page) || 1
  const limit = 10 // Number of products per page
  const skip = (page - 1) * limit

  // Build  search filter
  let filter = {}
  if (searchValue) {
    filter = {
      $or: [{ name: { $regex: searchValue, $options: 'i' } }],
    }
  }

  const totalCategory = await Category.countDocuments({
    isDeleted: false,
  })

  const totalPages = Math.ceil(totalCategory / limit)

  const categories = await Category.find({ ...filter, isDeleted: false })
    .skip(skip)
    .limit(limit)

  res.render('admin/pages/categories/ListCategory', {
    layout: 'layouts/admin-layout.ejs',
    categories,
    page,
    totalPages,
  })
}

// delete category
const deleteCategory = async (req, res) => {
  const id = req.params.id
  try {
    const category = await Category.findById(id)
    category.isDeleted = true
    await category.save()
    res.redirect('/admin/categories')
  } catch (error) {
    res.json({
      Error: error,
      DeveloperNote: 'error from delete category controlle',
    })
  }
}

// edit category
const editCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const category = await Category.findById(categoryId)

    if (!category) {
      return res.status(404).render('admin/pages/categories/EditCategory', {
        layout: 'layouts/admin-layout',
        title: 'Edit Category',
        errorMessage: 'Category not found',
      })
    }

    res.render('admin/pages/categories/EditCategory', {
      layout: 'layouts/admin-layout',
      title: 'Edit Category',
      category,
    })
  } catch (error) {
    console.error(error)
  }
}

// post edit category
const postEditCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const category = await Category.findById(categoryId)

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    const { name, description } = req.body
    let imagePath = category.image.path.replace(/.*\/public\//, '/')

    if (req.file) {
      // If an old image exists, delete it
      if (imagePath) {
        const oldImagePath = path.join('public', imagePath) // Convert stored path to absolute path
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }

      // Save only relative path
      imagePath = '/' + path.relative('public', req.file.path)
    }

    // Update category
    category.name = name
    category.description = description
    category.image.path = imagePath
    await category.save()

    res.redirect('/admin/categories')
  } catch (error) {
    console.error(error)
    res.redirect('/admin/categories')
  }
}

const categoryController = {
  getAddCategory,
  getCategoryList,
  postAddCategory,
  deleteCategory,
  editCategory,
  postEditCategory,
}

// export controller
export default categoryController
