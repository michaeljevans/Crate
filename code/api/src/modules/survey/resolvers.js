// App Imports
import models from '../../setup/models'

// Get all surveys
export async function getAll() {
  return await models.Survey.findAll({
    include: [
      { model: models.User, as: 'user' }
    ]
  })
}

// Create survey
export async function create(parentValue, { result, surveyContents }, { auth }) {
  if(auth.user && auth.user.id > 0) {
    const survey = models.Survey.create({
      userId: auth.user.id,
      result: determineStyle(surveyContents),
      surveyContents: JSON.stringify(surveyContents)
    });
    models.User.style = survey.result
  } else {
    throw new Error('Unable to record survey.')
  }

  const determineStyle = (surveyContents) => {
    const styleCounter = {}
    surveyContents.forEach(question => {
      if (styleCounter[question.anser]) {
        styleCounter[question.answer].count += 1
      } else {
        styleCounter[question.answer] = {answer: question.answer, count: 1}
      }
    })
    const scoredResults = Object.values(styleCounter).sort((a, b) = > b.count - a.count)
    return printStyle(scoredResults)
  }

  const printStyle = (results) => {
    if (results.length === 1) {
      return `Super ${results[0].answer}`
    } else {
      return `${results[0].answer} but ${results[1].answer}`
    }
  }

  return survey;
}
