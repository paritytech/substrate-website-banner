const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");
const Showdown = require("showdown");
const converter = new Showdown.Converter({ simplifiedAutoLink: true });

exports.onPreInit = () => console.log("Loaded banner-plugin");

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;
  const bannersBasePath = path.join(__dirname, "content/en/banners");
  const bannersDirectory = fs.readdirSync(bannersBasePath);

  for (const bannerMDFile of bannersDirectory) {
    fs.readFile(
      `${bannersBasePath}/${bannerMDFile}`,
      "utf8",
      async (err, markdownData) => {
        // taken from here https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-remark/src/on-node-create.js
        const data = matter(markdownData);
        const markdownNode = {
          id: createNodeId(`${bannerMDFile} >>> MarkdownRemark`),
          parent: null,
          children: [],
          internal: {
            type: `BannersMarkdown`,
            content: data.content,
            contentDigest: createContentDigest(data),
          },
        };

        markdownNode.frontmatter = {
          title: ``, // always include a title
          ...data.data,
        };

        markdownNode.excerpt = data.excerpt;
        markdownNode.rawMarkdownBody = data.content;
        markdownNode.internal.contentDigest = createContentDigest(markdownNode);
        markdownNode.html = converter.makeHtml(data.content);
        createNode(markdownNode);
      }
    );
  }
};
