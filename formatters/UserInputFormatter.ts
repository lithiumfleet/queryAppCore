// This formatter belongs to Controller
import { Action, Answer, parseEnumValue, QuestionID } from "../QuestionTypes"

export type RawUserInput = {
  timeStamp: number
  action: string
  data?: {
    questionID: string
    answer: string
    note?: string
  }
}

type UserInput = {
  timeStamp: number
  action: Action
  data?: {
    questionID: QuestionID
    answer: Answer
    note?: string
  }
}

export class UserInputFormatter {
  format(userInput: RawUserInput): UserInput {
    const action = parseEnumValue(Action, userInput.action)

    // action: undo
    if (!userInput.data) {
      return {
        timeStamp: userInput.timeStamp,
        action,
      }
    }

    // action: answer
    const data = {
      questionID: userInput.data.questionID as QuestionID,
      answer: parseEnumValue(Answer, userInput.data.answer),
      note: userInput.data.note,
    }
    return {
      timeStamp: userInput.timeStamp,
      action,
      data,
    }
  }
}
