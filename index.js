const visit = require('unist-util-visit');
const fetch = require('node-fetch');

const getSlideshareData = async (url) => {
  const apiUrl = `http://www.slideshare.net/api/oembed/2?url=${url}&format=json&maxWidth=600`;

  const response = await fetch(apiUrl);
  return await response.json();
};

const slideshareRegexp = /https:\/\/[www\.]*slideshare\.net\/([A-Za-z0-9-_]+\/[A-Za-z0-9-_?=]+)/gi;

// only do the embedding for a single twitter url on its own paragraph.
const isSlideshareLink = node => {
  return node.children.length === 1 &&
    node.children[0].type === 'link' &&
    node.children[0].url.match(slideshareRegexp) &&
    node.children[0].children.length === 1 &&
    node.children[0].children[0].type === 'text' &&
    node.children[0].children[0].value === node.children[0].url;
}

module.exports = async ({ markdownAST }, pluginOptions) => {
  const debug = pluginOptions.debug ? console.log : () => {}

  const nodes = [];
  visit(markdownAST, 'paragraph', (node) => {
    if (isSlideshareLink(node)) {
      debug(`\nfound Slideshare Link`, node.children[0].url)
      nodes.push([node, node.children[0].url])
    }
  })

  for (let i = 0; i < nodes.length; i++) {
    const nt = nodes[i];
    const node = nt[0];
    const slideshareLink = nt[1];
    debug(`\nembeding Slidesahre: ${slideshareLink}\n`);
    try {
      const embedData = await getSlideshareData(slideshareLink);
      node.type = 'html';
      node.value = embedData.html;
      node.children = null;
    } catch (er) {
      debug(`\nfailed to get data for ${slideshareLink}\n`, er)
    }
  }

  return markdownAST;
};
