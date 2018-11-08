const path = require('path')
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope')

/**
 * generatePostContent: Create pages for each markdown file.
 */
const generatePostContent = (createPage, nodes) => {
  const template = path.resolve('src/templates/contentTemplate.jsx')

  nodes.forEach(({ node }) => {
    createPage({
      path: node.fields.postSlug,
      component: componentWithMDXScope(
        template,
        node.code.scope,
        __dirname,
      ),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        id: node.id,
        postSlug: node.fields.postSlug,
      },
    })
  })
};

module.exports = {
  generatePostContent,
}