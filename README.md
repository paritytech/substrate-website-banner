# gatsby-plugin-substrate-banners

## Setup

1. If this is your firs time installing the plugin as a submodule, please run

`git submodule add https://github.com/paritytech/substrate-website-banner.git plugins/gatsby-plugin-substrate-banners`

2. Add `"gatsby-plugin-substrate-banners": "./plugins/gatsby-plugin-substrate-banners"` as a dependency in your `package.json`

3. Add the plugin in your `gatsby.config.js`

```js
module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-substrate-banners',
    ...
    ]
}
```

4. run `yarn` to install the local plugin

## Making changes

Once the changes are made and merged, you can update the installed plugin submodule by running the following command

`git submodule update --remote`

### Usage

```js
const {
  allBannersMarkdown: { edges: banners },
} = useStaticQuery(
  graphql`
    query {
      allBannersMarkdown(
        filter: { frontmatter: { active: { eq: true } } }
        limit: 2
      ) {
        edges {
          node {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `
);
```
