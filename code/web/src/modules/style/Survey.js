// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import Card from '../../ui/card/Card'
import H3 from '../../ui/typography/H3'
import H4 from '../../ui/typography/H4'
import { black, white, grey } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import { messageShow, messageHide } from '../common/api/actions'
import {testSurvey as survey} from '../../../src/modules/common/surveys/example-survey'

class Survey extends Component {
  constructor(props) {
    super(props) 
  }

  buildSurvey = () => {
    return survey.map(question => (
        <Card style={{width: '75em', margin: '2.5em auto', backgroundColor: white }}>
          <H4 font="secondary" style={{ color: black }}>{question.question}</H4>
          {question.images.map(answer => (
            <img src={APP_URL + answer.src} alt={answer.description} />
          ))}
        </Card>
      )
    )
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Style Survey</title>
        </Helmet>
        
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">Tell us about your style!</H3>
            {/* <p style={{ marginTop: '1em', color: grey2 }}>You can choose crate which suits your need. You can also */}
              {/* subscribe to multiple crates.</p> */}
          </GridCell>
        </Grid>
        <Grid>
          <GridCell>
            {
              this.buildSurvey()
            }
          </GridCell>
        </Grid>
      </div>
    )
  }
}

Survey.propTypes = {

}

export default connect(null, {})(withRouter(Survey))

