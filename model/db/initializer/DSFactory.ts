import { QuestionDS, NoticeDS, SuperNoticeDS } from "./DS"
import { Answer, QuestionID, Question } from "../../../Types"
import * as fs from "fs"
import { parse } from "csv-parse"

type MapperFunction<T> = (line: string[]) => T

async function* csvLineGenerator<T>(
  filePath: string,
  mapper: MapperFunction<T>,
): AsyncGenerator<T> {
  const fileStream = fs.createReadStream(filePath, { encoding: "utf-8" })
  const parser = fileStream.pipe(parse({ delimiter: ",", from_line: 2 }))

  for await (const row of parser) {
    yield mapper(row)
  }
}

type CSVLine = {
  qid: string
  content: string
  notice: string
  trueJump: string
  falseJump: string
  noteJump: string
  unit: string
}

const mapper = (line: string[]): CSVLine => ({
  qid: line[0],
  content: line[1] || "",
  notice: line[2] || "",
  trueJump: line[3] || "",
  falseJump: line[4] || "",
  noteJump: line[5] || "",
  unit: line[6] || "",
})

function NOQ(content: string, nextQid: QuestionID) {
  return {
    content,
    jumpTable: new Map([[Answer.NoteOnly, nextQid]]),
  } as Question
}
function BCQ(content: string, trueCase: QuestionID, falseCase: QuestionID) {
  return {
    content,
    jumpTable: new Map([
      [Answer.True, trueCase],
      [Answer.False, falseCase],
    ]),
  } as Question
}

export function getAllDSinited() {
  const questionDS = new QuestionDS()
  const noticeDS = new NoticeDS()
  const superNoticeDS = new SuperNoticeDS()

  function isSuperNotice(line: CSVLine): boolean {
    return line.trueJump === "" && line.falseJump === "" && line.noteJump === ""
  }

  function isNoteOnly(line: CSVLine): boolean {
    return line.noteJump !== ""
  }

  function handleCSVLine(line: CSVLine) {
    if (isSuperNotice(line)) {
      superNoticeDS.set(line.qid, line.content + "<SP>" + line.notice)
    } else {
      if (isNoteOnly(line)) {
        questionDS.set(line.qid, NOQ(line.content, line.noteJump))
        noticeDS.set(line.qid, line.notice)
      } else {
        questionDS.set(
          line.qid,
          BCQ(line.content, line.trueJump, line.falseJump),
        )
        noticeDS.set(line.qid, line.notice)
      }
    }
  }

  ;(async () => {
    const csvFilePath =
      "src/main/questionnarie/model/db/initializer/questions.csv"
    for await (const line of csvLineGenerator(csvFilePath, mapper)) {
      handleCSVLine(line)
    }
  })()

  return { questionDS, noticeDS, superNoticeDS }
}
