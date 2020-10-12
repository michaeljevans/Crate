// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'

// UI Imports
import styles from './styles'

// App Imports
import { getList as getCratesList } from '../../crate/api/actions'
import { getListByUser as getSubscriptionListByUser } from '../../subscription/api/actions'
import Loading from '../../common/Loading'
import EmptyMessage from '../../common/EmptyMessage'
import CrateItem from '../../crate/Item'
import { routes } from '../../../setup/routes'

// Component
/* NOTE: Accesses the crate data from the store, maps over the array of crates
-> renders a ‘CrateItem’ (aka, Item) for each crate in the list.
CrateItem file path ‘web/src/modules/crate/Item.js’
Each CrateItem has a subscription button
Subscription button onClick => triggers a ‘create’ action passing in the crateID.
The create action is run, it posts a mutation called 'subscriptionCreate'. Create returns an id.
The creates response, if not an error, will trigger a move to another page (/subscriptions)

*/
class List extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(getCratesList())
  }

  /* NOTE: Hijacking the subscription button to render style survey
User object needs to know if a subscribe has been clicked before
Subscription button checks if user.style exists ? subscription page (existing functionality) : our new function set
-> /style-preferences
Has the survey
Button to post survey content
Response gets the resulting style
  */
 
  #onSuccessSubscription = () => {
    const { navigation, dispatch } = this.props

    dispatch(getSubscriptionListByUser(this.props.user.details.email))

    navigation.navigate(routes.account.name)
  }

  render() {
    const { isLoading, list } = this.props.crates

    return (
      <View style={styles.container}>
        {
          isLoading
            ? <Loading />
            : list && list.length > 0
              ? <ScrollView style={styles.itemContainer}>
                  { list.map((crate, i) => (
                    <CrateItem
                      key={crate.id}
                      crate={crate}
                      lastItem={list.length - 1 === i}
                      onSuccessSubscription={this.#onSuccessSubscription}
                    />
                  )) }
                </ScrollView>
              : <EmptyMessage message={'No crate is available at the moment'} />
        }
      </View>
    )
  }
}

// Component Properties
List.propTypes = {
  crates: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

// Component State
function listState(state) {
  return {
    crates: state.crates,
    user: state.user
  }
}

export default connect(listState)(withNavigation(List))
