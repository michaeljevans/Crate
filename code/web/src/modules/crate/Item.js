// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'

// UI Imports
import Card from '../../ui/card/Card'
import Button from '../../ui/button/Button'
import H4 from '../../ui/typography/H4'
import Icon from '../../ui/icon'
import { white, grey2, black } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import userRoutes from '../../setup/routes/user'
import styleSurvey from '../../setup/routes/styleSurvey'
import { messageShow, messageHide } from '../common/api/actions'
import { create } from '../subscription/api/actions'
import { mensSurvey } from '../../modules/common/surveys/men-survey'
import { womensSurvey } from '../../modules/common/surveys/women-survey'

// Component
class Item extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      surveyRedirect: false
    }
  }

  handleClick = (crateId) => {
    if (!this.props.user.style) {
      this.setState({ 
        surveyRedirect: true
      }) 
      // this.props.history.push(styleSurvey.survey.path)
    } else {
      this.subscribeUserToCrate(crateId)
    }
  }

  static subscribeUserToCrate = (crateId, owner = this) => {
    owner.setState({
      isLoading: true
    })

    owner.props.messageShow('Subscribing, please wait...')
    owner.props.create({ crateId })
    
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          owner.props.messageShow(response.data.errors[0].message)
        } else {
          owner.props.messageShow('Subscribed successfully.')

          owner.props.history.push(userRoutes.subscriptions.path)
        }
      })
    .catch(error => {
      owner.props.messageShow('There was some error subscribing to this crate. Please try again.')
    })
    .then(() => {
      owner.setState({
        isLoading: false
      })

      window.setTimeout(() => {
        owner.props.messageHide()
      }, 5000)
    })
  }

  findGenderedSurvey = () => {
    let { name } = this.props.crate
    name = name.split(' ')
    const gender = name[name.length - 1]

    return gender === 'Men' ? mensSurvey : womensSurvey
  }

  render() {
    const { id, name, description } = this.props.crate
    const { isLoading, surveyRedirect } = this.state

    return (
      <Card style={{ width: '18em', backgroundColor: white }}>
        <p style={{ padding: '2em 3em 0 3em' }}>
          <img src={`${ APP_URL }/images/crate.png`} alt={name} style={{ width: '100%' }}/>
        </p>

        <div style={{ padding: '1em 1.2em' }}>
          <H4 font="secondary" style={{ color: black }}>{name}</H4>

          <p style={{ color: grey2, marginTop: '1em' }}>{description}</p>

          <p style={{ textAlign: 'center', marginTop: '1.5em', marginBottom: '1em' }}>
            <Button
              theme="primary"
              onClick={this.handleClick.bind(this, id)}
              type="button"
              disabled={ isLoading }
            >
              <Icon size={1.2} style={{ color: white }}>add</Icon> Subscribe
            </Button>
          </p>
        </div>
        {surveyRedirect && 
          <Redirect to ={{
            pathname: "/style-preferences",
            state: {crateId: id, survey: this.findGenderedSurvey()}
          }}
          />
        }
      </Card>
    )
  }
}

// Component Properties
Item.propTypes = {
  crate: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function itemState(state) {
  return {
    user: state.user
  }
}

export default connect(itemState, { create, messageShow, messageHide })(withRouter(Item))
