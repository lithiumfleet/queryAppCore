import { HistoryNode } from "./HistoryNode"
import { QuestionID, Answer, Note } from "../../Types"

export class HistoryStack {
  private items: HistoryNode[] = []

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
    if (this.length == 0) {
      throw Error("[HistoryStack] Pop error: stack is empty")
    }
    return this.items.pop() as HistoryNode
  }

  get length() {
    return this.items.length
  }
}
