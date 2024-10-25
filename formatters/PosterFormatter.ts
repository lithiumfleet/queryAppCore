// This formatter belongs to Poster
import { Notice } from "../model/db/DBTypes"
import { HistoryNode } from "../history/stack/HistoryNode"
import { QuestionID } from "../QuestionTypes"

type RawFontInfo = {
  currentQuestion: {
    qid: QuestionID
    content: string
  }
  currentNotice: Notice | undefined
  currentHistory: HistoryNode[]
}

type FontHistory = {
  timeStamp: number
  questionID: string
  answer: string
  note?: string
}

type FontInfo = {
  currentQuestion: {
    questionID: string
    content: string
  }
  currentNotice?: string
  currentHistory: FontHistory[]
}

export class PostFormatter {
  // poster formatter
  format(rawFontInfo: RawFontInfo): FontInfo {
    const currentHistory: FontHistory[] = []
    rawFontInfo.currentHistory.forEach((val) => {
      currentHistory.push({
        timeStamp: val.time,
        questionID: val.qid,
        answer: val.answer,
        note: val.note,
      })
    })
    return {
      currentQuestion: {
        questionID: rawFontInfo.currentQuestion.qid,
        content: rawFontInfo.currentQuestion.content,
      },
      currentNotice: rawFontInfo.currentNotice,
      currentHistory,
    }
  }
}
