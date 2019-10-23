import React from "react"
import { Helmet } from "react-helmet"
import { useIntl } from "react-intl"

import "./layout.scss"
import { Header } from "./header"

export const Layout = ({ children, title, description }) => {
  const { formatMessage, locale } = useIntl()

  let siteTitle = formatMessage({ id: "meta.title" })
  let siteDescription = formatMessage({ id: "meta.description" })

  if (title) {
    siteTitle = `${title} - ${siteTitle}`
  }

  if (description) {
    siteDescription = description
  }

  // Remove HTML tags
  siteTitle = siteTitle.replace(/<[^>]+>/g, '');
  siteDescription = siteDescription.replace(/<[^>]+>/g, '');

  return (
    <div className="layout">
      <Helmet>
        <html lang={locale} dir="ltr" />
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="yandex-verification" content="30c2d0909ff74243" />

        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//mc.yandex.ru" />
      </Helmet>
      <header className="layout__header"><Header /></header>
      <main className="layout__main">{children}</main>
      <footer className="layout__footer" />
    </div>
  )
}
