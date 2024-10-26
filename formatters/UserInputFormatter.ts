// This formatter belongs to Controller
import { Action, Answer, parseEnumValue } from "../QuestionTypes"

export type RawUserInput = {
  timeStamp: number
  action: string
  data?: {
    answer: string
    note?: string
  }
}

type UserInput = {
  timeStamp: number
  action: Action
  data?: {
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
