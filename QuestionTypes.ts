export type QuestionID = string

export enum Action {
  Answer = "Answer",
  Undo = "Undo",
  GetQuestionnarieA = "GetQuestionnarieA",
  GetQuestionnarieB = "GetQuestionnarieB",
}

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

export enum Answer {
  False = "False",
  True = "True",
}

export type Note = string
