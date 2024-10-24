import { History } from "../history/History"

type RenderHistory = {
  history: {
    time: number
    qid: string
    answer: number
    note?: string
  }[]
}

export class PostFormatter {
  format(history: History): RenderHistory {
    return {
      history: history.getCurrentHistory(),
    }
  }
}
