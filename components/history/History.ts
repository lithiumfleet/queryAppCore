import { HistoryStack } from "./stack/HistoryStack"
import { QuestionID, Answer, Note } from "../../QuestionTypes"

export class History {
  private history: HistoryStack
  commit(
    time: number,
    qid: QuestionID,
    answer: Answer,
    note: Note | undefined = undefined,
  ) {
    // 向history提交回答
    this.history.push(time, qid, answer, note)
    console.info(
      `[History] history append one piece: ${time}, ${qid}, ${answer}, ${note}`,
    )
  }
  undo() {
    // 撤回
    this.history.pop()
    console.info(`[History] history undo once`)
  }
  getCurrentHistory() {
    console.info(`[History] getting current history`)
    return this.history.getCurrentStack()
  }
}
