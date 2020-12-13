import React, { useRef } from "react"

// From https://eng.wealthfront.com/2020/10/01/building-a-truly-accessible-clickable-div/
export function ClickableArea(props) {
  const clickableElemTypes = ["a", "button", "input"]
  const refExpandedArea = useRef()
  const Root = props.tag || 'div';

  function handleClick(e) {
    const clickableElements = [
      ...refExpandedArea.current.querySelectorAll("[data-click-area]"),
    ]
    if (clickableElements.length !== 1) {
      throw new Error(
        `Expected one clickable element but found ${clickableElements.length}`,
      )
    }
    const clickableElement = clickableElements[0]
    const targetIsClickable = clickableElemTypes.includes(e.target.tagName.toLowerCase())

    if (clickableElement !== e.target && !targetIsClickable) {
      clickableElement.click()
    }
  }

  return (
    <Root
      ref={refExpandedArea}
      className={props.className}
      tabIndex="0"
      onClick={handleClick}
    >
      {props.children}
    </Root>
  )
}
