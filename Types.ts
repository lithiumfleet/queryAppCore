export type QuestionID = string

export enum Action {
  Answer = "Answer",
  Undo = "Undo",
  GetQuestionnarieA = "GetQuestionnarieA",
  GetQuestionnarieB = "GetQuestionnarieB",
}

export enum Answer {
  False = "False",
  True = "True",
  NoteOnly = "NoteOnly",
}

export type Note = string

export type Notice = string

export type SuperNotice = string

export type Question = {
  content: string
  jumpTable: Map<Answer, QuestionID>
}

// Used in Model to mark begin/end of questionnaire
export enum QuestionnarieCtlToken {
  BEGA = "BEG_A",
  ENDA = "END_A",
  BEGB = "BEG_B",
  ENDB = "END_B",
}

// Enum utils
export function isEnumValue<T extends object>(
  enumObj: T,
  value: unknown,
): value is T[keyof T] {
  return Object.values(enumObj).includes(value)
}

export function parseEnumValue<T extends object>(
  enumObj: T,
  value: unknown,
): T[keyof T] {
  if (isEnumValue(enumObj, value)) {
    return value
  } else {
    throw new Error(
      `[parseEnumValue] Can not cast "${value}" to ${enumObj.constructor.name}`,
    )
  }
}
