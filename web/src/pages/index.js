import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import ArticlePreviewGrid from '../components/article-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    articles: allSanityArticle(
      limit: 6
      sort: {fields: [publishedAt], order: DESC}
    ) {
      edges {
        node {
          id
          image {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
          }
          title
          description
          articleUrl
        }
      }
     }
    projects: allSanityProject(
      limit: 6
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors}/>
      </Layout>
    )
  }

  const site = (data || {}).site
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  const articleNodes = (data || {}).articles
    ? mapEdgesToNodes(data.articles)
      .filter(filterOutDocsPublishedInTheFuture)
    : []


  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords}/>
      <Container>
        <h1 hidden>{site.title}</h1>
        <div className='d-flex justify-content-end'>
          {/*{projectNodes && (*/}
          {/*  <ProjectPreviewGrid*/}
          {/*    title='Latest projects'*/}
          {/*    nodes={projectNodes}*/}
          {/*    browseMoreHref='/archive/'*/}
          {/*  />*/}
          {/*)}*/}
            {articleNodes && (
              <ArticlePreviewGrid
                title='Latest articles'
                nodes={articleNodes}
                browseMoreHref='/archive/'
              />
            )}
        </div>
      </Container>
    </Layout>
  )
}

export default IndexPage
