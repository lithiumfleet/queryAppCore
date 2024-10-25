import { PostFormatter } from "./formatters/PosterFormatter"

export class Poster {
  private formatter = new PostFormatter()

  pushToRender() {
    // TODO:拉取当前问题和历史, 发送到渲染进程
    // @ts-ignore: bridge will init later
    // { currentQuestion: Question, currentNotice: Notice | undefined }
    const { currentQuestion, currentNotice } = this.bridge.call(
      "QuestionnaireModel.getCurrentQuestionAndNotice",
    )
    // @ts-ignore: bridge will init later
    const currentHistory = this.bridge.call("History.getCurrentHistory")
  }
}
