import { QuestionID, Question, Notice, SuperNotice } from "../../../Types"

export class QuestionDS {
  private ds: Map<QuestionID, Question> = new Map()

  set(qid: QuestionID, question: Question) {
    this.ds.set(qid, question)
  }

  get(qid: QuestionID): Question | undefined {
    return this.ds.get(qid)
  }
}

export class NoticeDS {
  private ds: Map<QuestionID, Notice> = new Map()

  set(qid: QuestionID, notice: Notice) {
    this.ds.set(qid, notice)
  }

  get(qid: QuestionID): Notice | undefined {
    return this.ds.get(qid)
  }
}

export class SuperNoticeDS {
  private ds: Map<QuestionID, SuperNotice[]> = new Map()

  set(qid: QuestionID, superNotice: SuperNotice) {
    const notices = this.ds.get(qid)
    if (notices) {
      notices.push(superNotice)
    } else {
      this.ds.set(qid, [superNotice])
    }
  }

  get(qid: QuestionID): SuperNotice | undefined {
    const snList = this.ds.get(qid)
    if (snList) {
      return JSON.stringify(snList)
    } else {
      return undefined
    }
  }
}
