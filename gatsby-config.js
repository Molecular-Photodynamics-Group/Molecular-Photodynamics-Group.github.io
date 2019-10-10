const ru = require("./src/locales/ru.json")
const en = require("./src/locales/en.json")

module.exports = {
  siteMetadata: {
    siteUrl: `https://mpd.chemphys.ru`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/images/`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-149415782-1",
      },
    },
    {
      resolve: `gatsby-plugin-yandex-metrika`,
      options: {
        trackingId: "55613563",
        clickmap: true,
        trackLinks: true,
        trackHash: true,
        accurateTrackBounce: true,
        webvisor: true,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://mpd.chemphys.ru",
        sitemap: "https://mpd.chemphys.ru/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        lang: "ru",
        name: ru.meta.title,
        description: ru.meta.description,
        short_name: "mpd_group",
        start_url: "/",
        background_color: "#eeeeee",
        theme_color: "#d65947",
        display: "standalone",
        icon: "src/images/icon.png",
        localize: [
          {
            start_url: `/en/`,
            lang: `en`,
            name: en.meta.title,
            description: en.meta.description,
          },
        ],

      },
    },
    `gatsby-plugin-offline`,
  ],
}
