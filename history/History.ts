import { HistoryStack } from "./stack/HistoryStack"
import { QuestionID, Answer, Note } from "../Types"
import { ToBridgeBindable } from "../Bridge"

@ToBridgeBindable
export class History {
  private history: HistoryStack = new HistoryStack()

  commit(
    time: number,
    qid: QuestionID,
    answer: Answer,
    note: Note | undefined = undefined,
  ) {
    // 向history提交回答
    this.history.push(time, qid, answer, note)
    console.info(
      `[History] History append one piece:\t${time}\t${qid}\t${answer}\t${note}`,
    )
  }

  undo() {
    // 撤回
    if (this.history.length == 0) {
      console.warn(`[History] Current Stack is empty`)
      return undefined
    }

    const { qid } = this.history.pop()
    console.info(`[History] History undo. Question ID: ${qid}`)
    return qid as QuestionID
  }

  getCurrentHistory() {
    console.info(`[History] Getting current history`)
    return this.history.getCurrentStack()
  }

  resetHistory() {
    console.info(`[History] Resetting history`)
    this.history.reset()
  }
}
