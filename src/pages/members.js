import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "react-intl"

import { Layout } from "../components/layout"
import { MemberCard } from "../components/member-card"
import { defaultLocale } from "../intl/locales"
import { getLocalizedNodes } from "../intl/utils"

import "./members.scss"

export default ({ data, pageContext: { locale } }) => {
  const nodes = data.allMarkdownRemark.edges.map(e => e.node)

  const localizedNodes = getLocalizedNodes(nodes, locale, defaultLocale)
    .sort((a, b) => (+a.frontmatter.order - +b.frontmatter.order)
      || a.frontmatter.lastName.localeCompare(b.frontmatter.lastName),
    )

  const { formatMessage } = useIntl()
  const title = formatMessage({ id: "pages.members" })

  return (
    <Layout title={title}>
      <section>
        <h1>{title}</h1>
        <div className="members">
          {localizedNodes.map(
            node =>
              (
                <MemberCard
                  key={node.id}
                  name={[node.frontmatter.lastName, node.frontmatter.firstName].join(" ")}
                  photo={node.frontmatter.photo}
                  slug={node.fields.slug}
                  position={node.frontmatter.position}
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
        allMarkdownRemark(
            filter: {fields: {type: {eq: "members"}}}
        ){
            edges {
                node {
                    id
                    frontmatter {
                        order
                        firstName,
                        middleName
                        lastName,
                        position,
                        photo {
                            childImageSharp {
                                fluid {
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
