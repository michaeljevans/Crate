// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
// renaming getList to 'getCratesList'for use in this component
import { getList as getCratesList } from './api/actions'
import Loading from '../common/Loading'
import EmptyMessage from '../common/EmptyMessage'
import CrateItem from './Item'

// Component
class List extends PureComponent {

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getCratesList('ASC'))
  }

  // Runs on client only
  componentDidMount() {
    // triggers GET_LIST_REQUEST action via getList import from `admin/crate/api`
    // getList -> GET_LIST_REQUEST action is an axios post query which fetches the crates data and adds it to the store
    // argument 'ASC' means ascending order
    this.props.getCratesList('ASC')
  }

  render() {
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Crates for everyone! - Crate</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">Crates for everyone!</H3>

            <p style={{ marginTop: '1em', color: grey2 }}>You can choose crate which suits your need. You can also
              subscribe to multiple crates.</p>
          </GridCell>
        </Grid>

        {/* Crate list */}
        <Grid>
          <GridCell>
            {/* if the crates fetch hasn't returned promise yet then render the Loading component. Once promise is returned and data is available in store then map over the array of crates and render a 'CrateItem (aka Item) for each crate. */}
            {
              this.props.crates.isLoading
                ? <Loading/>
                : this.props.crates.list.length > 0
                    ? this.props.crates.list.map(crate => (
                      <div key={crate.id} style={{ margin: '2em', float: 'left' }}>
                        <CrateItem crate={crate}/>
                      </div>
                    ))
                    : <EmptyMessage message="No crates to show" />
            }
          </GridCell>
        </Grid>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  crates: PropTypes.object.isRequired,
  getCratesList: PropTypes.func.isRequired
}

// Component State
// accessing the crates data from the store
function listState(state) {
  return {
    crates: state.crates
  }
}

export default connect(listState, { getCratesList })(List)
