import { ToBridgeBindable } from "../Bridge"
import {
  isEnumValue,
  QuestionID,
  Answer,
  Note,
  Question,
  QuestionnarieCtlToken,
} from "../Types"

@ToBridgeBindable
export class QuestionnaireModel {
  private currentQid: QuestionID | undefined = undefined

  getCurrentQid() {
    return { currentQid: this.currentQid }
  }

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

  setQuestionnarie(name: "A" | "B") {
    console.info(`[Model] Setting current questionnarie to ${name}`)
    if (name === "A") this.currentQid = QuestionnarieCtlToken.BEGA
    else if (name === "B") this.currentQid = QuestionnarieCtlToken.BEGB
    else {
      throw Error(`[Model] "${name}" is not a name of questionnaries`)
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
      if (answer === Answer.NoteOnly) {
        throw Error(
          `[Model] Answer is marked as "NoteOnly" and Current Question "${this.currentQid}" doesn't have "NoteOnly" in jump table. Did you set it?`,
        )
      }
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
        "[Model] currentQid is empty string or undefined. Try calling setQuestionnarie before answer the questions.",
      )
    }
    if (isEnumValue(QuestionnarieCtlToken, this.currentQid)) {
      console.info(
        `[Model] ${this.currentQid} is special token, will not commit to history`,
      )
      return
    }
    if (answer === Answer.NoteOnly && !note) {
      throw Error("[Model] Answer is marked as 'NoteOnly' while note is empty.")
    }
    // @ts-ignore: bridge will init later
    this.bridge.call("History.commit", time, this.currentQid, answer, note)
    console.info(
      `[Model] Commit to history:\t${time}\t${this.currentQid}\t${answer}\t${note}`,
    )
  }
}
