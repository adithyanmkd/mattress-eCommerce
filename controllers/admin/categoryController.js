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
  const { categoryName, description } = req.body
  const imgPath = req.files.categoryImage[0].path.replace(/.*\/public\//, '/')
  const category = await Category.find({ name: categoryName })

  if (category.length > 0) {
    return res.json({ Error: 'category already exits' })
  }

  try {
    const newCategory = new Category({
      name: categoryName,
      description,
      image: {
        path: imgPath,
        alt: `${categoryName} image`,
      },
    })

    await newCategory.save() // saving new category
    res.redirect('/admin/categories')
  } catch (error) {
    res.json({ Error: error, DeveloperNote: 'error from post add category' })
  }
}

// list all categories
const getCategoryList = async (req, res) => {
  let searchValue = req.query.search || '' // accessing search value from url

  const page = parseInt(req.query.page) || 1
  const limit = 1 // Number of products per page
  const skip = (page - 1) * limit

  // Build the search filter
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
    res.status(500).render('admin/pages/categories/EditCategory', {
      layout: 'layouts/admin-layout',
      title: 'Edit Category',
      errorMessage: 'An error occurred while fetching the category',
    })
  }
}

// post edit category
const postEditCategory = async (req, res) => {
  console.log('Request Body:', req.body)
  console.log('Uploaded File:', req.file)

  try {
    const categoryId = req.params.id
    const category = await Category.findById(categoryId)

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    const { name, description } = req.body
    let imagePath = category.image.path.replace(/.*\/public\//, '/')
    console.log(imagePath, 'here------')

    if (req.file) {
      // If an old image exists, delete it
      if (imagePath) {
        const oldImagePath = path.join('public', imagePath) // Convert stored path to absolute path
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }

      // Save only relative path
      imagePath = req.file.path.replace(/^public\//, '/')
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
