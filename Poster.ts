import { PostFormatter } from "./formatters/PosterFormatter"
import { BrowserWindow } from "electron"
import { ToBridgeBindable } from "./Bridge"

@ToBridgeBindable
export class Poster {
  private formatter = new PostFormatter()
  private mainWindow: BrowserWindow | undefined = undefined

  setMainWindow(window: BrowserWindow) {
    this.mainWindow = window
    console.info("[Poster] MainWindow setted.")
  }

  syncRender() {
    // 拉取当前问题和历史, 发送到渲染进程
    // @ts-ignore: bridge will init later
    const { currentQid } = this.bridge.call("QuestionnaireModel.getCurrentQid")
    if (!currentQid) {
      throw Error(`[Poster] Current question id is ${currentQid}`)
    }
    const { currentQuestion, currentNotice, currentSuperNotice } =
      // @ts-ignore: bridge will init later
      this.bridge.call("QuestionDB.getQuestionAndNotice", currentQid)

    // @ts-ignore: bridge will init later
    const currentHistory = this.bridge.call("History.getCurrentHistory")

    const fontInfo = this.formatter.format({
      currentQuestion: {
        qid: currentQid,
        content: currentQuestion.content,
      },
      currentSuperNotice,
      currentNotice,
      currentHistory,
    })
    console.debug(`[Poster] FontInfo: ${JSON.stringify(fontInfo)}`)
    if (!this.mainWindow) {
      throw Error(
        `[Poster] Poster is not correctly inited, mainWindow is undefined`,
      )
    }
    this.mainWindow.webContents.send("sync-font-info", fontInfo)
    console.info("[Poster] Finish sync\n")
  }
}
