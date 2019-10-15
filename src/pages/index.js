import React from "react"
import { graphql } from "gatsby"

import { Layout } from "../components/layout"
import { getLocalizedNodes } from "../intl/utils"
import { defaultLocale } from "../intl/locales"

export default ({ data, pageContext: { locale } }) => {
  const indexNodes = data.allMarkdownRemark.edges.map(e => e.node)
  const index = getLocalizedNodes(indexNodes, locale, defaultLocale).shift()

  const {
    html,
    frontmatter: {
      header,
    },
  } = index

  return (
    <Layout>
      <section>
        <h1>{header}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </Layout>
  )
}

export const query = graphql`
    query {
        allMarkdownRemark(filter: { fields: { name: { eq: "index" }}}) {
            edges {
                node {
                    html
                    frontmatter {
                        header
                    }
                    fields {
                        locale
                        slug
                    }
                }
            }
        }
    }
`

