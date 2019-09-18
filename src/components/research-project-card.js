import React from "react"
import { FormattedMessage } from "react-intl"
import { Link } from "../intl/link"
import Img from "gatsby-image"

import "./research-project-card.scss"

export const ResearchProjectCard = ({ title, photo, slug }) => {
  return (
    <div className="research-project-card card card--bottom card--with-hover">
      <div className="research-project-card__image-wrapper">
        <Img className="research-project-card__image" fluid={photo.childImageSharp.fluid} alt={title}/>
      </div>
      <div className="research-project-card__info">
        <div className="research-project-card__title">{title}</div>
        <Link className="research-project-card__more-link" to={slug}>
          <FormattedMessage id="common.more-details" />
        </Link>
      </div>
    </div>
  )
}
