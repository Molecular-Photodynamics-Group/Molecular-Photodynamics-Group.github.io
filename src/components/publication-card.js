import React, { useState } from "react"
import cn from "classnames"
import { FormattedMessage } from "react-intl"
import { Link } from "../intl/link"

import "./publication-card.scss"
import { ClickableArea } from "./clickable-area"

export const PublicationCard = ({ node }) => {
  const [isAbstractVisible, setAbstractVisibility] = useState(false)

  const toggleAbstractVisibility = () => {
    setAbstractVisibility(!isAbstractVisible)
  }

  return (
    <ClickableArea
      tag="article"
      className="publication-card card card--left card--with-hover"
    >
      <h3 className="publication-card__title">
        <span dangerouslySetInnerHTML={{ __html: node.frontmatter.title }} />
      </h3>
      <div>{node.frontmatter.journal}</div>
      <nav className="publication-card__links">
        {
          !!node.html &&
          <button className="link-button publication-card__link"
            onClick={toggleAbstractVisibility}
          >
            <FormattedMessage id="common.abstract" />
          </button>
        }
        <Link className="publication-card__link" to={node.fields.slug} data-click-area>
          <FormattedMessage id="common.more-details" />
        </Link>
      </nav>
      <aside
        className={cn("publication-card__abstract", { "publication-card__abstract--visible": isAbstractVisible })}
        dangerouslySetInnerHTML={{ __html: node.html }}
      />
    </ClickableArea>
  )
}
