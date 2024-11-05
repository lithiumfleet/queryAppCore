# Formatters

Formatters, or you can say these are Protrol Adapters.

# Protrols

## 1. Font to backend

#### (From font)UserInput

```javascript
{
  timeStamp: number,
  action: string,
  answer?: string,
  note?: string,
}
```

Process with ipc in main process:

```typescript
ipcMain.on("user-input", (_, data: RawUserInput) => {
  controller.processUserInputs(data)
})
```

#### (To backend)UserInput

```javascript
{
  timeStamp: number,
  action: Action,
  answer?: Answer,
  note?: Note
}
```

## 2. Backend to font

#### (From backend)FontInfo

```javascript
{
  currentQuestion: Question,
  currentNotice?: Notice,
  currentSuperNotice?: SuperNotice,
  currentHistory: HistoryNode[],
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
  currentSuperNotice?: string,
  currentHistory: {
    timeStamp: string,
    questionID: string,
    answer: string,
    note?: string,
  }[]
}
```

This will be sent using webContents.

```typescript
// in Poster.ts
this.mainWindow.webContents.send("sync-font-info", fontInfo)
```
