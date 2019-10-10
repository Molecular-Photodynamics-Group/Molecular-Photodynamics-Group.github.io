import React from "react"
import { graphql } from "gatsby"
import { FormattedMessage } from "react-intl"
import Img from "gatsby-image"

import { Layout } from "../components/layout"
import { PublicationCard } from "../components/publication-card"
import { getLocalizedNodes } from "../intl/utils"
import { defaultLocale } from "../intl/locales"

import "./members.scss"

export default ({ data, pageContext: { locale } }) => {
  const memberNodes = data.allMarkdownRemark.edges.map(e => e.node)
  const memberLocalizedNodes = getLocalizedNodes(memberNodes, locale, defaultLocale)

  const member = memberLocalizedNodes.shift().frontmatter

  const publicationsNodes = data.publications.edges.map(e => e.node)
  const publications = getLocalizedNodes(publicationsNodes, locale, defaultLocale)
    .sort((a, b) => +b.frontmatter.year - +a.frontmatter.year)

  let educations = member.educations || []
  educations = educations.sort((a, b) => +b.start - +a.start)

  let memberName = `${member.lastName} ${member.firstName}`

  if (member.middleName) {
    memberName = `${memberName} ${member.middleName}`
  }

  return (
    <Layout title={memberName} description={member.position}>
      <article className="member">
        <h1>{memberName}</h1>
        <section className="member__info-block">
          <div className="member__info card card--left">
            <h3 className="member__position">{member.position}</h3>
            <div className="member__degree">{member.degree}</div>
            {
              member.interests &&
              <div className="member__interests">
                <h4 className="member__interests-label">
                  <FormattedMessage id="member-page.interests" />
                </h4>
                <ul className="member__interests-list">
                  {member.interests.map((e, i) => (
                    <li className="member__interest" key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            }
          </div>
          <div className="member__photo-wrapper card">
            <Img className="member__photo" fluid={member.photo.childImageSharp.fluid} />
          </div>
        </section>
        {
          educations.length > 0 &&
          <section>
            <h2>
              <FormattedMessage id="member-page.education" />
            </h2>
            <div className="member__educations card card--left">
              {educations.map((e, i) => (
                <div key={i} className="member__education education">
                  <div className="education__first-line">
                    <h4 className="education__place">{e.place}</h4>
                    {
                      e.start
                      &&
                      <div className="education__dates">
                        {e.start} - {e.end || <FormattedMessage id="member-page.now" />}
                      </div>
                    }
                  </div>
                  <p className="education__level">{e.level}</p>
                  <p className="education__diploma" dangerouslySetInnerHTML={{ __html: e.diploma }} />
                </div>
              ))}
            </div>
          </section>
        }
        {
          publications.length > 0
          &&
          <section>
            <h2>
              <FormattedMessage id="member-page.publications" />
            </h2>
            <div className="member__publications">
              {publications.map(
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
        allMarkdownRemark(filter: { fields: { slug: { eq: $slug } }}) {
            edges {
                node {
                    frontmatter {
                        firstName
                        middleName
                        lastName
                        degree
                        photo {
                            childImageSharp {
                                fluid(maxWidth: 300) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        position
                        educations {
                            start
                            end
                            level
                            place
                            diploma
                        }
                        interests
                    }
                    fields {
                        slug
                        locale
                    }
                }
            }
        }
        publications: allMarkdownRemark(filter: {
            fields: { type: {eq: "publications"}  },
            frontmatter: { members: { eq: $name } }
        }) {
            totalCount
            edges {
                node {
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
    }
`
