// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// UI Imports
// import { Grid, GridCell } from '../../ui/grid'
// import Button from '../../ui/button'
// import ImageTile from '../../ui/image/Tile'
// import Input from '../../ui/input/Input'
// import H3 from '../../ui/typography/H3'
// import Icon from '../../ui/icon'
// import { level1 } from '../../ui/common/shadows'
// import { white } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import { messageShow, messageHide } from '../common/api/actions'
import {testSurvey as survey} from '../../../src/modules/common/surveys/example-survey'

class Survey extends Component {
  constructor(props) {
    super(props) 
  }

  buildSurvey = () => {
    testSurvey.map(question => {
      <div>
        <h2>question.question</h2>
        {question.answers.map(answer => {
          <img src={APP_URL + answer.src} alt={answer.description} />
        })}
      </div>
    })
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
          <gridCell>
            {
              this.buildSurvey()
            }
          </gridCell>
        </Grid>

      </div>
    )
  }
}

Survey.propTypes = {

}

export default connect(null, {})(withRouter(Survey))

