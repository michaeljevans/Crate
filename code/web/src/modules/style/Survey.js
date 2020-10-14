// Imports
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
import { mensSurvey } from '../../../src/modules/common/surveys/men-survey'
import { routes } from '../../setup/routes/'

class Survey extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      survey: mensSurvey,
      submitted: false,
      isLoading: false
    }
  }

  buildSurvey = () => {
    const { survey } = this.state
    return survey.map((question, i) => (
      <Card key={`question-${i}`}style={{width: '75em', margin: '2.5em auto', backgroundColor: white }}>
          <H4 font="secondary" style={{ color: black }}>{question.question}</H4>
          {question.images.map((option, j) => (
            <img 
              style={this.outlineSelection(option.value, question.answer)}
              style={{width: '14em', height: '20em'}}
              key={`option-${i}-${j}`}
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
    const { survey } = this.state
    survey[questionIndex].answer = answer
    this.setState({survey: survey})
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
      console.log(routes.subscriptions)
      // set state isLoading = true
      // post goes here
      this.setState({submitted: true})
    } else {
      this.props.messageShow('Please answer each question in the survey submitting')
      window.setTimeout(() => {
        this.props.messageHide()
      }, 5000)
    }
  }

  hasMissingAnswers = () => (
    this.state.survey.every(question => question.answer !== null)
  )
  
  render() {
    const { isLoading, submitted } = this.state
    return (
      <div>
        <Helmet>
          <title>Style Survey</title>
        </Helmet>
        
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">Tell us about your style!</H3>
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
              disabled={ isLoading }
            >
              Submit
            </Button>
          </GridCell>
        </Grid>
        {submitted && <Redirect to={routes.subscriptions.path}/>}
      </div>
    )
  }
}

Survey.propTypes = {
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

export default connect(null, {messageShow, messageHide})(withRouter(Survey))

