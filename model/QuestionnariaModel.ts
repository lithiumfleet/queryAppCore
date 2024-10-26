import { ToBridgeBindable } from "../Bridge"
import { isEnumValue, QuestionID } from "../QuestionTypes"
import { Answer, Note } from "../QuestionTypes"
import { Notice, Question, QuestionnariaCtlToken } from "./db/DBTypes"

@ToBridgeBindable
export class QuestionnaireModel {
  private currentQid: QuestionID | undefined = undefined

  setCurrentQid(qid: QuestionID | undefined) {
    // 设置currentQis到下一个Qid
    if (!qid) {
      console.warn(
        `[Model] You are trying setting currentQid from ${this.currentQid} to undefined`,
      )
    }
    console.info(`[Model] set qid to ${qid}`)
    this.currentQid = qid
  }

  setQuestionnaria(name: "A" | "B") {
    console.info(`[Model] Setting current questionnaria to ${name}`)
    if (name === "A") this.currentQid = QuestionnariaCtlToken.BEGA
    else if (name === "B") this.currentQid = QuestionnariaCtlToken.BEGB
    else {
      throw Error(`[Model] "${name}" is not a name of questionnarias`)
    }
  }

  getNextQid(answer: Answer) {
    // 解析下一个QuestionID
    // @ts-ignore: bridge will init later
    const currentQuestion: Question | undefined = this.bridge.call(
      "QuestionDB.getQuestion",
      this.currentQid,
    )
    if (!currentQuestion) {
      throw Error(
        `[Model] Current Question "${this.currentQid}" can not be found in QuestionDB`,
      )
    }

    const nextQid = currentQuestion.jumpTable.get(answer)
    if (!nextQid) {
      throw Error(
        `[Model] Current Question ID "${this.currentQid}" can not match answer "${answer}" in jump table`,
      )
    }

    return nextQid as QuestionID
  }

  processCommit(
    time: number,
    answer: Answer,
    note: Note | undefined = undefined,
  ) {
    // 加入历史, 设置并解析
    if (!this.currentQid) {
      throw Error(
        "[Model] currentQid is empty string or undefined. Try calling setQuestionnaria before answer the questions.",
      )
    }
    if (isEnumValue(QuestionnariaCtlToken, this.currentQid)) {
      console.info(
        `[Model] ${this.currentQid} is special token, will not commit to history`,
      )
      return
    }
    // @ts-ignore: bridge will init later
    this.bridge.call("History.commit", time, this.currentQid, answer, note)
    console.info(
      `[Model] Commit to history: ${time}\t${this.currentQid}\t${answer}\t${note}`,
    )
  }

  getCurrentQuestionAndNotice() {
    // 给Poster调用
    // @ts-ignore: bridge will init later
    const currentQuestion: Question | undefined = this.bridge.call(
      "QuestionDB.getQuestion",
      this.currentQid,
    )
    if (!currentQuestion) {
      throw Error(
        `[Model] Current Question "${this.currentQid}" can not be found in QuestionDB`,
      )
    }
    // @ts-ignore: bridge will init later
    const currentNotice: Notice | undefined = this.bridge.call(
      "QuestionDB.getNotice",
      this.currentQid,
    )
    return { currentQid: this.currentQid, currentQuestion, currentNotice }
  }
}
