import React from 'react'
import {graphql} from 'gatsby'
import {cn, filterOutDocsPublishedInTheFuture, filterOutDocsWithoutSlugs, mapEdgesToNodes} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ArticlePreviewGrid from '../components/article-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import {responsiveTitle3} from "../components/typography.module.css";
import styles from "../components/article-preview-grid.module.css";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
      homeImage {
        asset {
          url
        }
      }
    }
    articles: allSanityArticle(
      limit: 20
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
          publishedAt
          categories {
            title
          }
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

        <div className="jumbotron jumbotron-fluid bg-dark">
          <div className="container">
            <img className="py-4"
              src={site.homeImage.asset.url}
              alt={site.title}
              width="100%"
            />
            <div className={cn(responsiveTitle3, styles.description)}>{site.description}</div>
          </div>
        </div>
        <div id='articles' className='d-flex justify-content-end'>
            {articleNodes && (
              <ArticlePreviewGrid
                title='Latest articles'
                nodes={articleNodes}
              />
            )}
        </div>

        <div id='contact' className="container">

          <h3 className={styles.headline}>Contact us</h3><br/>

          <div className="row">
            <div className="col-md-8">
              <form name="contact" method="POST" data-netlify="true">
                <input className="form-control" name="name" placeholder="Name..."/><br/>
                <input className="form-control" name="phone" placeholder="Phone..."/><br/>
                <input required className="form-control" name="email" placeholder="E-mail..."/><br/>
                <textarea className="form-control" name="text" placeholder="How can we help you?"></textarea><br/>
                <input className="btn btn-secondary" type="submit" value="Send"/><br/><br/>
              </form>
            </div>
            <div className="col-md-4">
              Maximingo Limited <br/>
              94 Tender Road<br/>
              Dairy Flat<br/>
              Auckland<br/>
              Phone: +64 (0)22 608 6513<br/>
              E-mail: <a href="mailto:info@maximingo.com">info@maximingo.com</a><br/>


            </div>
          </div>

        </div>



      </Container>
    </Layout>
  )
}

export default IndexPage
