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
export async function create(parentValue, { surveyContents }, { auth }) {
  const style = determineStyle(surveyContents)
  if(auth.user && auth.user.id > 0) {
    await models.Survey.create({
      userId: auth.user.id,
      result: style,
      surveyContents: surveyContents
    });
    models.User.style = style
    return style
  } else {
    throw new Error('Unable to record survey.')
  }
}
const determineStyle = (surveyContents) => {
  const styleCounter = {}
  JSON.parse(surveyContents).forEach(question => {
    if (styleCounter[question.anser]) {
      styleCounter[question.answer].count += 1
    } else {
      styleCounter[question.answer] = { answer: question.answer, count: 1 }
    }
  })
  const scoredResults = Object.values(styleCounter).sort((a, b) => b.count - a.count)
  return printStyle(scoredResults)
}

const printStyle = (results) => {
  if (results.length === 1) {
    return `Super ${results[0].answer}`
  } else {
    return `${results[0].answer} but ${results[1].answer}`
  }
}