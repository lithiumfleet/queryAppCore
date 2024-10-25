# Formatters

Formatters, or you can say these are Protrol Adapters.

# Protrols

## 1. Font to backend

#### (From font)UserInput

```javascript
{
  timeStamp: number,
  action: "answer" | "undo",
  data?: {
    questionID: string,
    answer: "true" | "false",
    note?: string
  }
}
```

#### (To backend)UserInput

```javascript
{
  timeStamp: number,
  action: Action,
  data?: {
    questionID: QuestionID,
    answer: Answer,
    note?: string
  }
}
```

## 2. Backend to font

#### (From backend)FontInfo

```javascript
{
  currentQuestion: Question
  currentNotice: Notice | undefined
  currentHistory: HistoryNode[]
}
```

#### (To font)FontInfo

```javascript
{
  currentQuestion: {
    questionID: string,
    content: string,
  },
  currentNotice: {
    notice: string
  },
  currentHistory: {
    history: [
      {
        timeStamp: string,
        questionID: string,
        answer: boolean
      }
    ]
  }
}
```
