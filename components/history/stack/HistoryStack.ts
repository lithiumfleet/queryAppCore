import { HistoryNode } from "./HistoryNode"
import { QuestionID, Answer, Note } from "../../../QuestionTypes"

export class HistoryStack {
  private items: HistoryNode[]

  getCurrentStack() {
    return this.items
  }
  push(
    time: number,
    qid: QuestionID,
    answer: Answer,
    note: Note | undefined = undefined,
  ) {
    this.items.push({
      time,
      qid,
      answer,
      note,
    })
  }
  pop() {
    return this.items.pop()
  }
}
