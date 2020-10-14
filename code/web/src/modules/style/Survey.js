// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import Card from '../../ui/card/Card'
import Button from '../../ui/button/Button'
import H3 from '../../ui/typography/H3'
import H4 from '../../ui/typography/H4'
import { black, white, grey } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import { messageShow, messageHide } from '../common/api/actions'
import {testSurvey} from '../../../src/modules/common/surveys/example-survey'

class Survey extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      survey: testSurvey,
      isLoading: false
    }
  }

  
  buildSurvey = () => {
    return this.state.survey.map((question, i) => (
      <Card style={{width: '75em', margin: '2.5em auto', backgroundColor: white }}>
          <H4 font="secondary" style={{ color: black }}>{question.question}</H4>
          {question.images.map(option => (
            <img 
              style={this.outlineSelection(option.value, question.answer)}
              src={APP_URL + option.src} 
              alt={option.description} 
              onClick={() => {
                this.trackAnswers(i, option.value)
              }} 
            />
            ))}
        </Card>
      )
      )
    }
    
    trackAnswers = (questionIndex, answer) => {
      console.log(answer)
      const updatedSurvey = this.state.survey
      updatedSurvey[questionIndex].answer = answer
      this.setState({survey: updatedSurvey})
    }

    outlineSelection = (answer, selection) => {
      const imgStyle = {
        cursor: 'pointer',
        border: ''
      }
      if (answer === selection) {
        imgStyle.border = '4px solid #000000'
      }
      return imgStyle
    }

    submitSurvey = () => {
      if(this.hasMissingAnswers()) {
        console.log('all good')
      } else {
        console.log('please finish')
      }
    }

    hasMissingAnswers = () => (
      this.state.survey.every(question => question.answer !== null)
    )

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
          <GridCell>
            <Button
              theme="primary"
              onClick={this.submitSurvey}
              type="button"
              // disabled={ isLoading }
            >
              Submit
            </Button>
          </GridCell>
        </Grid>
      </div>
    )
  }
}

Survey.propTypes = {

}

export default connect(null, {})(withRouter(Survey))

