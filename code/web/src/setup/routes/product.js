// App Imports
import Detail from '../../modules/product/Detail'

// Product routes
// Route is based on product slug; e.g., '/products/belt-for-men'
export default {
  product: {
    path: (slug = ':slug') => (`/product/${ slug }`),
    component: Detail
  }
}
