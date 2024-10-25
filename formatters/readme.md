# Formatters

Formatters, or you can say these are Protrol Adapters.

# Protrols

## 1. Font to backend

#### (From font)UserInput

```javascript
{
  timeStamp: number,
  action: string, // "Answer" | "Undo"
  data?: {
    answer: string, // "True" | "False"
    note?: string
  }
}
```

Process with ipc in main process:

```typescript
ipcMain.on("user:input", (_, data) => {
  controller.processUserInputs(data)
})
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
  currentNotice?: string,
  currentHistory: [
    {
      timeStamp: string,
      questionID: string,
      answer: string
    }
  ]
}
```

This will be sent using webContents.

```typescript
// in Poster.ts
this.mainWindow.webContents.send("sync:font-info", fontInfo)
```
