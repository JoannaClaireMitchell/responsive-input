import * as React from 'react'
import styled from '@emotion/styled'

import { useFitText } from './useFitText'

const Wrapper = styled.div`
  max-width: 100%;
  margin: auto;
  height: 100%;
  padding: 0 10px;
  @media (min-width: 1040px) {
    max-width: 1040px;
  }
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
`

const Header = styled.div`
  width: 100%;
  padding: 20px;
`

const Container = styled.div`
  width: 400px;
  max-width: 100%;
`

const InputWrapper = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  align-items: center;
  background-color: #f3f3f3;
  padding: 10px;
  border-radius: 4px;
`

const Label = styled.label`
  font-size: 0.9em;
  font-weight: bold;
`

const Input = styled.input`
  margin-bottom: 10px;
  width: 100%;
  font-size: 1em;
  font-family: var(--font-family-body);
`

const Space = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`

const Slider = styled.input`
  margin-bottom: 10px;
  width: 100%;
`

const Output = styled.div`
  height: 50px;
  box-sizing: content-box;
  line-height: 50px;
  border: 1px solid black;
  background-color: white;
  color: black;
  width: ${(props) => props.width}vw;
  font-size: ${(props) => props.fitTextSize};
  text-align: center;
  max-width: 100%;
  align-self: center;
  overflow: hidden;
  white-space: nowrap;
`

const dummyContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Cras congue, dolor non hendrerit dignissim...`

function App() {
  const [input, setInput] = React.useState(
    () => sessionStorage.getItem('inputValue') || dummyContent,
  )
  const [sliderValue, setSliderValue] = React.useState(
    () => sessionStorage.getItem('sliderValue') || 50,
  )
  const [fitTextSize, ref] = useFitText(sliderValue, input, {
    minFontSize: 1,
    maxFontSize: 30,
  })

  React.useEffect(() => {
    sessionStorage.setItem('inputValue', input)
  }, [input])

  React.useEffect(() => {
    sessionStorage.setItem('sliderValue', sliderValue)
  }, [sliderValue])

  return (
    <Wrapper className="Wrapper">
      <Flex>
        <Header>
          <h1>useFitText</h1>
          <p>
            Edit the text in the input field. <br></br>Then use the slider to
            resize the output and watch the content shrink to fit.
          </p>
        </Header>
        <InputWrapper>
          <Container>
            <Space>
              <Label htmlFor="#input">Text input</Label>
              <Input
                id="input"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </Space>
            <Space>
              <Label htmlFor="#slider">Output width control</Label>
              <Slider
                id="slider"
                type="range"
                min="5"
                max="100"
                step="5"
                value={sliderValue}
                onChange={(event) => setSliderValue(event.target.value)}
              />
            </Space>
          </Container>
          <Output
            id="output"
            ref={ref}
            fitTextSize={fitTextSize}
            width={sliderValue}
          >
            {input}
          </Output>
        </InputWrapper>
      </Flex>
    </Wrapper>
  )
}

export default App
