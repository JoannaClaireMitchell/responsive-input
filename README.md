# useFitText 
`useFitText` is a React hook that will calculate the maximum possible font size for one line of text content to be fully visible in its container without wrapping. It takes arguments for width and content and returns an array of 2 things; a ref to attach to the React Component in question, and the maximum calculated font size to fit inside of it. 
See the [demo in action here](https://usefittext.netlify.app/)

# Usage
`useFitText` is a named export.
```
import { useFitText } from './useFitText'
```
Call `useFitText` from within a functional component and pass the width and content values to it. The calculation will run each time the width and content change to get a fresh value. If the content is fed from a controlled input field, then you can pass the input value from state here.

```
function Component() {
  const [input, setInput] = React.useState('')

  const [fitTextSize, ref] = useFitText(width, input, {
    minFontSize: 1,
    maxFontSize: 30,
  })
  ...
  
  return (
    <Input
      id="input"
      type="text"
      value={input}
      onChange={(event) => setInput(event.target.value)}
    />
    ...
   )
```
Then use the `ref` returned from `useFitText` to target the component you wish to scale the text content inside. `ref` is a React.useRef that is essential for making the  maximum fontSize calculations.
```
  <Output ref={ref}>
    {input}
  </Output>
```
The `fitTextSize` value returned from `useFitText` will be a string containing the fontsize in pixels (`25px`). Use this value to set the style on the ref component.

## Parameters
`width` is the controlled width of the output. If this changes it will cause the fitText function to re-run to return the new fontSize  

`content` is the text content of the ref component.

`options` is an optional argument where maxFontSize and minFontSize can be passed. If these options are not specified, minFontSize will default to 1 and maxFontSize will be calculated from the height of the ref element.

## CSS
You should also make sure that the React Component you are targeting has the css styles to force text to display on one line only:
```
.output{
  overflow: hidden;
  white-space: nowrap;
}
```
