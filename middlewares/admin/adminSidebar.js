let tempPath = ''

const adminSidebar = (req, res, next) => {
  res.locals.adminSidebar = [
    {
      id: 'customer-menu',
      toggleId: 'customer-icon',
      name: 'Customers',
      nestedItems: [
        {
          name: 'All Customers',
          href: '/admin/customers',
          active: req.path === '/customers',
        },
        {
          name: 'Customer Details',
          href: '#',
          active: req.path === '/customers/details',
        },
      ],
    },
    {
      id: 'products',
      toggleId: 'product-icon',
      name: 'Product',
      nestedItems: [
        {
          name: 'Product List',
          href: '/admin/products',
          active: req.path === '/products',
        },
        {
          name: 'Add Product',
          href: '/admin/product/add',
          active: req.path === '/add-product',
        },
        {
          name: 'Category List',
          href: '#',
          active: req.path === '/category',
        },
      ],
    },
  ]
  next()
}

export default adminSidebar
