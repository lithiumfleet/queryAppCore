// This formatter belongs to Controller
import { Action, Answer, Note, parseEnumValue } from "../Types"

export type RawUserInput = {
  timeStamp: number
  action: string
  answer?: string
  note?: string
}

type UserInput = {
  timeStamp: number
  action: Action
  answer?: Answer
  note?: Note
}

export class UserInputFormatter {
  format(userInput: RawUserInput): UserInput {
    return {
      timeStamp: userInput.timeStamp,
      action: parseEnumValue(Action, userInput.action),
      answer: userInput.answer
        ? parseEnumValue(Answer, userInput.answer)
        : Answer.NoteOnly,
      note: userInput.note,
    }
  }
}
