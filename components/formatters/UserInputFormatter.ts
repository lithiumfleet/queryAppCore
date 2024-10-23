import { QuestionID, Answer } from "../../QuestionTypes"

type RawUserInput = {
  timeStamp: number
  questionID: string
  answer: number
  note?: string
}

type UserInput = {
  timeStamp: number
  questionID: QuestionID
  answer: Answer
  note: string | undefined
}

export class UserInputFormatter {
  format(userInput: RawUserInput): UserInput {
    let ans: Answer
    switch (userInput.answer) {
      case 0:
        ans = Answer.False
        break
      case 1:
        ans = Answer.True
        break
      default:
        throw Error(
          `Unexpected number in answer from font: ${userInput.answer}`,
        )
    }

    return {
      timeStamp: userInput.timeStamp,
      questionID: userInput.questionID,
      answer: ans,
      note: userInput.note,
    }
  }
}
