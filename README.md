# useFitText 
`useFitText` is a React hook which takes arguments for width and content and returns an array of 2 things; a ref to pass as a prop to the React component that you wish to fit the text to, and the fontSize calculated as the maximum fontsize to fit all of the text inside that React Component when displayed all in one line. 

# Usage
`useFitText` is a named export.
```
import { useFitText } from './useFitText'
```
Call `useFitText` from within a functional component and pass the width and content values to it.

```
function Component() {
  ...
  const [fitTextSize, ref] = useFitText(sliderValue, input, {
    minFontSize: 1,
    maxFontSize: 30,
  })
```
Then use the `ref` returned from `useFitText` to target the component you wish to scale the text content inside.
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
You should make sure that the React Component you are targeting has the css styles to force text to display on one line only:
```
.output{
  overflow: hidden;
  white-space: nowrap;
}
```


Nice to haves
- memoize maximum fontsize based on the height of the container.



# Requirements
// You need to create a JavaScript solution to make a variable length text fit inside a container with
// flexible width but fixed height.
// An HTML page should present a form with a text input and a range slider input.
// The page must also have a div (let’s call it “output div”) with a 1px visible border and height of
// 50px (height of this div shouldn’t change under any circumstances).
// The output div must display the text of the form’s input.
// When the text is updated the output div’s text should also be updated.
// The slider should change the width of the output div.

// The purpose of the solution is to “fit” the input text into the
// div in one line (no line breaks) within the div height and
// using the maximum possible integer font-size.
// The API of the solution should be something similar to fitText(‘element selector’);
// The form’s text input and range slider position should be persisted between page reloads.
