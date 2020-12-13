import React from "react"
import { FormattedMessage } from "react-intl"
import { Link } from "../intl/link"

import "./nav.scss"
import { LanguageSwitcher } from "./language-switcher"

const pages = [
  "research-projects",
  "members",
  "publications",
  "contacts",
]

export const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {
          pages.map(e => (
              <li key={e} className="nav__item">
                <Link className="nav__link" to={`/${e}/`}>
                  <FormattedMessage id={`pages.${e}`} />
                </Link>
              </li>
            ),
          )
        }
        <li className="nav__item"><LanguageSwitcher /></li>
      </ul>
    </nav>
  )
}
