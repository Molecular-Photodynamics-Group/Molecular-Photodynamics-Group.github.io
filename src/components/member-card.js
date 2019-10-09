import React from "react"
import { FormattedMessage } from "react-intl"
import { Link } from "../intl/link"
import Img from "gatsby-image"

import "./member-card.scss"

export const MemberCard = ({ name, photo, slug, position }) => {
  return (
    <article className="member-card card card--bottom card--with-hover">
      <div className="member-card__image-wrapper">
        <Img className="member-card__image" fluid={photo.childImageSharp.fluid} alt={name}/>
      </div>
      <div className="member-card__info">
        <h3 className="member-card__name">{name}</h3>
        <div className="member-card__position">{position}</div>
        <Link className="member-card__more-link" to={slug}>
          <FormattedMessage id="common.more-details" />
        </Link>
      </div>
    </article>
  )
}
