import React from "react"
import { graphql } from "gatsby"
import { FormattedMessage } from "react-intl"

import { Layout } from "../components/layout"
import { getLocalizedNodes } from "../intl/utils"
import { defaultLocale } from "../intl/locales"

import "katex/dist/katex.min.css"
import "./publications.scss"

export default ({ data, pageContext: { locale } }) => {
  const publicationNodes = data.allMarkdownRemark.edges.map(e => e.node)
  const publication = getLocalizedNodes(publicationNodes, locale, defaultLocale).shift()

  const {
    html,
    excerpt,
    frontmatter: {
      title,
      journal,
      year,
      volume,
      author,
      doi,
      issue,
    },
  } = publication

  return (
    <Layout title={title} description={excerpt}>
      <article className="publication">
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <div className="publication__card card card--left">
          <div className="publication__abstract">
            {
              html.length > 0
              &&
              <div dangerouslySetInnerHTML={{ __html: html }} />
            }
            {
              html.length === 0
              &&
              <p><FormattedMessage id="publication-page.no-abstract" /></p>
            }
          </div>
          <h4 className="publication__authors">{author}</h4>
          <div className="publication__journal">{journal} {year}, {volume}{issue && (", " + issue)} </div>
          <a href={"https://doi.org/" + doi} target="_blank" rel="noopener noreferrer">{doi}</a>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
    query($slug: String!) {
        allMarkdownRemark(filter: { fields: { slug: { eq: $slug }}}) {
            edges {
                node {
                    html
                    excerpt
                    frontmatter {
                        title
                        journal
                        year
                        volume
                        issue
                        author
                        doi
                    }
                    fields {
                        slug
                        locale
                    }
                }
            }
        }
    }
`
