import { ToBridgeBindable } from "../Bridge"
import { QuestionID } from "../QuestionTypes"
import { Answer, Note } from "../QuestionTypes"

@ToBridgeBindable
export class QuestionnaireModel {
  private currentQid: QuestionID = ""

  setCurrentQid(qid: QuestionID) {
    // 设置currentQis到下一个Qid
    console.info(`[Model] set qid to ${qid}`)
    this.currentQid = qid
  }

  getNextQid(answer: Answer) {
    // TODO:解析下一个QuestionID
  }

  processCommit(answer: Answer, note: Note | undefined = undefined) {
    // 加入历史, 设置并解析
    const currentTime = Date.now()
    if (!this.currentQid) {
      throw Error("[Model] currentQid is empty string.")
    }
    // @ts-ignore: bridge will init later
    this.bridge.call(
      "History.commit",
      currentTime,
      this.currentQid,
      answer,
      note,
    )
    console.info(
      `[Model] Commit to history: ${currentTime}\t${this.currentQid}\t${answer}\t${note}`,
    )
  }

  getCurrentQuestionAndNotice() {
    // TODO:给Poster调用
  }
}
