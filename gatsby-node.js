const path = require(`path`)

const { defaultLocale, locales } = require("./src/intl/locales")
const { groupBy } = require("./src/utils/group-by")

exports.onCreateNode = ({ node, getNode, actions, getNodes }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)

    let locale = defaultLocale
    let possibleLocale = fileNode.name.split(".").reverse()[0]

    if (locales.indexOf(possibleLocale) !== -1) {
      locale = possibleLocale
    }

    let name = fileNode.name.replace(`.${locale}`, "")

    if (fileNode.relativeDirectory === "publications") {
      name = name.replace("__", "/")
    }

    createNodeField({
      node,
      name: `type`,
      value: fileNode.relativeDirectory,
    })
    createNodeField({
      node,
      name: `name`,
      value: name,
    })
    createNodeField({
      node,
      name: `slug`,
      value: `/${fileNode.relativeDirectory}/${name}`,
    })
    createNodeField({
      node,
      name: `locale`,
      value: locale,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              type,
              name,
              slug,
              locale
            }
          }
        }
      }
    }
  `)

  const nodes = result.data.allMarkdownRemark.edges.map(e => e.node)
  const groupedNodes = groupBy(nodes, e => e.fields.slug)

  await Object.keys(groupedNodes).map(async slug => {
    const values = groupedNodes[slug]

    const defaultNode = values.filter(e => e.fields.locale === defaultLocale).shift()

    await locales.map(async locale => {
      let node = values.filter(e => e.fields.locale === locale).shift()

      if (!node) {
        node = defaultNode
      }

      await createLocalizedPage(
        {
          path: node.fields.slug,
          component: path.resolve(`./src/templates/${node.fields.type}.js`),
          context: {
            name: node.fields.name,
            type: node.fields.type,
            slug: node.fields.slug,
            locale,
          },
        },
        locale,
        createPage,
      )
    })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  deletePage(page)

  await locales.map(async locale => {
    await createLocalizedPage(
      {
        ...page,
        context: {
          ...page.context,
          locale,
        },
      }, locale, createPage)
  })
}

const createLocalizedPage = async (page, locale, createPage) => {
  const localizedPath = locale === defaultLocale
    ? page.path
    : locale + page.path

  await createPage({
    ...page,
    path: localizedPath,
  })
}
