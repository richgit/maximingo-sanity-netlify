import React from 'react'
import {graphql} from 'gatsby'
import {filterOutDocsPublishedInTheFuture, filterOutDocsWithoutSlugs, mapEdgesToNodes} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import styles from "../components/article-preview-grid.module.css";
import Zoom from 'react-reveal/Zoom';
import JumboBlock from "../components/jumbo-block";
import {LightSpeed} from "react-reveal";
import Pulse from 'react-reveal/Pulse';
import {responsiveTitle3} from "../components/typography.module.css";
import ImageContentHover from 'react-image-hover';

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
    quotes: allSanityQuote {
      edges {
        node {
          id
          source
          description
        }
      }
    }
    promos: allSanityPromo {
      edges {
        node {
          title
          url
          image {
            asset {
              url
            }
          }
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
          source
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

  const quoteNodes = (data || {}).quotes
    ? mapEdgesToNodes(data.quotes)
    : []

  const promoNodes = (data || {}).promos
    ? mapEdgesToNodes(data.promos)
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

        <div>
          <div className="jumbotron jumbotron-fluid bg-dark vh-100">

            <div className={styles.jumbo}>

              <JumboBlock image={site.homeImage} title={site.title} description={site.description}/>

            </div>
          </div>
        </div>

        <div id='quotes' className='d-flex justify-content-end'>
          {quoteNodes && (
            <div className={styles.root}>
              {quoteNodes &&
              quoteNodes.map(node => (
                <Zoom left key={node.id}>
                  <blockquote className={styles.quoteCard}>
                    <p className={responsiveTitle3}>
                      {node.description}
                    </p>

                    <cite>
                      - {node.source}
                    </cite>
                  </blockquote>
                </Zoom>
              ))}
            </div>
          )}
        </div>

        <Pulse>
          {promoNodes && (
            <div id='promos' className='logos-list w-240 d-flex flex-wrap justify-content-around align-items-center'>
              {promoNodes &&
              promoNodes.map(node => (
                <div className={styles.logo}>
                  <a href={node.url} className="btn">
                    <ImageContentHover
                      className={styles.middleText}
                      tileWidth="130px"
                      tileHeight="130px"
                      image={node.image.asset.url}
                      content={{
                        title: 'ppp',
                        body: ''
                      }}
                      effect="fadeIn" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </Pulse>


        {/*<div id='articles' className='d-flex justify-content-end'>*/}
        {/*  {articleNodes && (*/}
        {/*    <ArticlePreviewGrid*/}
        {/*      title=' '*/}
        {/*      nodes={articleNodes}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</div>*/}
        <LightSpeed bottom>
          <div id='contact' className="container">

            <h3 className={styles.headline}>Contact us</h3><br/>

            <div className="row">
              <div className="col-md-8">
                <form name="contact" method="POST" data-netlify="true">
                  <input className="form-control" name="name" placeholder="Name..." aria-label="Name"/><br/>
                  <input className="form-control" name="phone" placeholder="Phone..." aria-label="Phone"/><br/>
                  <input required type="email" className="form-control" name="email" placeholder="E-mail..."
                         aria-label="Email" aria-required="true"/><br/>
                  <textarea className="form-control" name="text" placeholder="How can we help you?"
                            aria-label="How can we help?"/><br/>
                  <input className="btn btn-secondary" type="submit" value="Send" aria-label="Send"/><br/><br/>
                </form>
              </div>
              <div className="col-md-4">
                Maximingo Limited <br/>
                94 Tender Road<br/>
                Dairy Flat<br/>
                Auckland<br/>
                Phone: +64 (0)22 608 6513<br/>
                E-mail: <a href="mailto:info@maximingo.com" rel="noopener">info@maximingo.com</a><br/>
              </div>
            </div>

          </div>
        </LightSpeed>

      </Container>
    </Layout>
  )
}

export default IndexPage
