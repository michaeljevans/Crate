// App Imports
import params from '../../../setup/config/params'
import CrateList from '../../../modules/admin/crate/List'
import CrateCreateOrEdit from '../../../modules/admin/crate/CreateOrEdit'

// Admin crate routes
// NOTE: Routes can exist anywhere, but this appears to be how to write them (with auth)
export const crateList = {
  path: '/admin/crates',
  component: CrateList,
  auth: true,
  role: params.user.roles.admin
}

export const crateCreate = {
  path: '/admin/crate/create',
  component: CrateCreateOrEdit,
  auth: true,
  role: params.user.roles.admin
}

export const crateEdit = {
  path: (id = ':id') => (`/admin/crate/${ id }/edit`),
  component: CrateCreateOrEdit,
  auth: true,
  role: params.user.roles.admin
}