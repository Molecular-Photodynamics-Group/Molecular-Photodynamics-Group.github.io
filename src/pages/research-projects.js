import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "react-intl"

import { Layout } from "../components/layout"
import { ResearchProjectCard } from "../components/research-project-card"
import { getLocalizedNodes } from "../intl/utils"
import { defaultLocale } from "../intl/locales"

import "./research-projects.scss"

export default ({ data, pageContext: { locale } }) => {
  const nodes = data.allMarkdownRemark.edges.map(e => e.node)
  const localizedNodes = getLocalizedNodes(nodes, locale, defaultLocale)
    .sort((a, b) => +a.frontmatter.order - +b.frontmatter.order)

  const { formatMessage } = useIntl()
  const title = formatMessage({ id: "pages.research-projects" })

  return (
    <Layout title={title}>
      <section>
        <h1>{title}</h1>
        <div className="research-projects">
          {localizedNodes.map(
            node =>
              (
                <ResearchProjectCard
                  key={node.id}
                  title={node.frontmatter.title}
                  photo={node.frontmatter.photo}
                  slug={node.fields.slug}
                />
              ),
          )}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
    query {
        allMarkdownRemark(filter: {fields: {type: {eq: "research-projects"}}}){
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        order
                        title,
                        photo {
                            childImageSharp {
                                fluid(maxHeight: 170, fit: CONTAIN, background: "white", cropFocus: CENTER) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
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
