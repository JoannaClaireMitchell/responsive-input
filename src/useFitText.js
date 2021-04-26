import * as React from 'react'

export function useFitText(widthControl, content, options = {}) {
  const elRef = React.useRef(null)
  const maxFontSize = options.maxFontSize || elRef.current.clientHeight || 50
  const minFontSize = options.minFontSize || 1
  const [fitFontSize, setFitFontSize] = React.useState(maxFontSize)

  const [cloneSpan, setCloneSpan] = React.useState('')

  React.useLayoutEffect(() => {
    if (!cloneSpan) {
      const clone = elRef.current.cloneNode()
      clone.id = 'fit-text-clone'
      clone.style.position = 'absolute'
      clone.style.zIndex = '-1'
      clone.style.opacity = '0'
      clone.setAttribute('aria-hidden', 'true')
      const newSpan = document.createElement('span')
      newSpan.textContent = elRef.current.textContent
      newSpan.style.verticalAlign = 'middle'
      newSpan.style.whiteSpace = 'nowrap'
      newSpan.style.overflow = 'hidden'

      const cloneEl = elRef.current.parentNode
        .appendChild(clone)
        .appendChild(newSpan)
      setCloneSpan(cloneEl)
    }

    if (cloneSpan) {
      cloneSpan.parentNode.style.width = widthControl + 'vw'
      cloneSpan.textContent = content
      cloneSpan.style.fontSize = fitFontSize + 'px'
    }
  }, [cloneSpan, widthControl, content, fitFontSize])

  React.useLayoutEffect(() => {
    if (elRef.current && cloneSpan) {
      const contentWidth = cloneSpan.getBoundingClientRect().width
      const containerWidth = elRef.current.clientWidth

      if (contentWidth === containerWidth) {
        // Do nothing if content fits
        return
      }

      if (contentWidth > containerWidth) {
        return setFitFontSize(
          decreaseFontSize(cloneSpan, containerWidth, minFontSize),
        )
      } else {
        return setFitFontSize(
          increaseFontSize(cloneSpan, containerWidth, maxFontSize),
        )
      }
    }
  }, [
    widthControl,
    content,
    cloneSpan,
    minFontSize,
    maxFontSize,
  ])

  return [fitFontSize + 'px', elRef]
}

// TODO chunk increment loops
function decreaseFontSize(clone, containerWidth, minFontSize) {
  const initialFontSize = parseInt(window.getComputedStyle(clone).fontSize)

  let fontSize = initialFontSize

  for (let i = fontSize; i > minFontSize; i--) {
    const contentWidth = Math.floor(clone.getBoundingClientRect().width)
    if (contentWidth > containerWidth) {
      fontSize--
      clone.style.fontSize = fontSize + 'px'
    } else {
      break
    }
  }

  return fontSize
}

function increaseFontSize(clone, containerWidth, maxFontSize) {
  const initialFontSize = parseInt(window.getComputedStyle(clone).fontSize)

  let fontSize = initialFontSize

  for (let i = fontSize; i < maxFontSize - 1; i++) {
    const contentWidth = Math.floor(clone.getBoundingClientRect().width)
    if (contentWidth < containerWidth) {
      fontSize++
      clone.style.fontSize = fontSize + 'px'
    } else if (contentWidth > containerWidth) {
      fontSize--
      break
    } else {
      break
    }
  }

  return fontSize
}
