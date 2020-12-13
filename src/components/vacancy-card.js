import React from "react"
import { FormattedMessage } from "react-intl"

import { Link } from "../intl/link"

import "./vacancy-card.scss"
import { ClickableArea } from "./clickable-area"

export const VacancyCard = ({ node }) => {
  return (
    <ClickableArea
      tag="article"
      className="vacancy-card card card--left card--with-hover"
    >
      <h3 className="vacancy-card__title">
        <span dangerouslySetInnerHTML={{ __html: node.frontmatter.title }} />
      </h3>
      <p>{node.excerpt}</p>
      <Link className="publication-card__more-link" to={node.fields.slug} data-click-area>
        <FormattedMessage id="common.more-details" />
      </Link>
    </ClickableArea>
  )
}
