const slugify = require('@sindresorhus/slugify')
const {
  generatePostContent
} = require('./node-utils')

/**
 * onCreateNode
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/#onCreateNode
 */
exports.onCreateNode = ({
  actions,
  node
}) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const slug = node.frontmatter.slug || node.frontmatter.path;
    createNodeField({
      node,
      name: 'postSlug',
      value: slugify(slug),
    })
  }
};

/**
 * createPages
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/#createPages
 */
exports.createPages = async ({
  actions,
  graphql
}) => {
  const { createPage } = actions
  // Query for markdown "nodes" to use in creating pages.
  const postQuery = `
    {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              postSlug
            }
            frontmatter {
              draft
            }
            code {
              scope
            }
          }
        }
      }
    }`
  // Fetching data using GraphQL query.
  const postData = await graphql(postQuery)
  if (postData.errors) {
    /* eslint no-console: "off" */
    console.error(postData.errors)
    throw new Error(`
      [GQL Err]Pages Couldn't Be Created:\n
      ${String(postData.errors)}
    `)
  }
  let allPosts = postData.data.allMdx.edges
  const publishedPosts = allPosts.filter(
    post => post.node.frontmatter.draft !== true
  ) 

  generateBlogContent(createPage, publishedPosts)
};

/**
 * onCreateWebpackConfig
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
 *      https://www.gatsbyjs.org/docs/add-custom-webpack-config
 * 
 * [1]: Allow us to use something like: import { X } from 'directory' 
 *      instead of '../../folder/directory'
 * [2]: Turn off source maps in production.
 */
exports.onCreateWebpackConfig = ({
  actions,
  stage
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'], /* [1] */
      alias: {
        $components: path.resolve(__dirname, 'src/components')
      }
    },
  })
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false, /* [2] */
    })
  }
};