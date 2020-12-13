import React from "react"
import { render  } from "@testing-library/react"
import { MemberCard } from "./member-card"
import { IntlProvider } from "react-intl"

describe("Member card", () => {
  it("should create card", () => {
    const config = {
      position: "position",
      name: "name",
      photo: {
        childImageSharp: {
          fluid: "https://image.jpeg"
        }
      },
      slug: "/slug/",
    }

    const { getByText } = render(<IntlProvider locale="en" onError={() => {}} ><MemberCard {...config} /></IntlProvider>)

    expect(getByText(config.position)).toBeInTheDocument()
    expect(getByText(config.name)).toBeInTheDocument()
  })
})
