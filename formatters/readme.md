# Formatters

Formatters, or you can say these are Protrol Adapters.

# Protrols

## Font

#### UserInput

```javascript
{
  timeStamp: string,
  questionID: string,
  answer: boolean,
  note?: string
}
```

## Backend

#### RenderQuestion

```javascript
{
  questionID: string,
  content: string,
  notice?: stirng
}
```

#### RenderHistory

```javascript
{
  history: [
    {
      timeStamp: string,
      questionID: string,
      answer: boolean
    }
  ]
}
```
