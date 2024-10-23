import { History } from "../history/History"

type RawHistory = History

type RenderHistory = {
  history: {
    time: number
    qid: string
    answer: number
    note?: string
  }[]
}

export class PostFormatter {
  format(history: RawHistory): RenderHistory {
    return {
      history: history.getCurrentHistory(),
    }
  }
}
