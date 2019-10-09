import React from "react"
import { graphql } from "gatsby"
import { FormattedMessage } from "react-intl"

import { Layout } from "../components/layout"
import { getLocalizedNodes } from "../intl/utils"
import { defaultLocale } from "../intl/locales"
import { PublicationCard } from "../components/publication-card"

import "./research-projects.scss"


export default ({ data: { researchProject, publications }, pageContext: { locale } }) => {
  const researchProjectNode = getLocalizedNodes(researchProject.nodes, locale, defaultLocale).shift()
  const publicationsNodes = getLocalizedNodes(publications.nodes, locale, defaultLocale)

  const {
    html,
    excerpt,
    frontmatter: {
      title,
    },
  } = researchProjectNode

  return (
    <Layout title={title} description={excerpt}>
      <article className="research-project">
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <section>
          <div className="research-project__card card card--left"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>
        {
          publicationsNodes.length > 0
          &&
          <section>
            <h2>
              <FormattedMessage id="research-project-page.publications" />
            </h2>
            <div className="member__publications">
              {publicationsNodes.map(
                node =>
                  (
                    <PublicationCard node={node} key={node.id} />
                  ),
              )}
            </div>
          </section>
        }
      </article>
    </Layout>
  )
}

export const query = graphql`
    query($slug: String!, $name: String!) {
        researchProject: allMarkdownRemark(filter: { fields: { slug: { eq: $slug }}}) {
            nodes {
                html
                excerpt
                frontmatter {
                    title
                }
                fields {
                    slug
                    locale
                }
            }
        }
        publications: allMarkdownRemark(filter: {
            fields: { type: {eq: "publications"}  },
            frontmatter: { researchProjects: { eq: $name } }
        }) {
            nodes {
                id
                html
                frontmatter {
                    title
                    journal
                    year
                    author
                }
                fields {
                    slug
                    locale
                }
            }
        }
    }
`
