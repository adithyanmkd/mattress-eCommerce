let tempPath = ''

const adminSidebar = (req, res, next) => {
  res.locals.adminSidebar = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      href: '/admin/',
      active: req.path === '/',
    },
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
          href: '/admin/products/add',
          active: req.path === '/products/add',
        },
        {
          name: 'Category List',
          href: '/admin/categories',
          active: req.path === '/categories',
        },
      ],
    },
  ]
  next()
}

export default adminSidebar
