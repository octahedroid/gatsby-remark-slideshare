# gatsby-remark-slideshare

Embed SlideShare presentations in Gatsby markdown.

## Install

```bash
npm install --save @weknow/gatsby-remark-slideshare
```

## How to use

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: ["@weknow/gatsby-remark-slideshare"]
    }
  }
];
```

## Usage

```markdown
# Blog post title

This is an example of embedding a slideshare presentation.
Add any markdown as you normally do, and then insert a valid
Slideshare link anywhere to automatically transform it into an
embed iframe.

http://www.slideshare.net/haraldf/business-quotes-for-2011

```

> __NOTE:__ Make sure to copy the Slideshare link instead of the embed code, also we recomend the use of `gatsby-remark-responsive-iframe` with this plugin, just make sure you add it after this plugin in your gatsby-config.


## How this looks like
<p align="center"><img src="https://i.imgur.com/XYv84ne.png" alt="screenshot of slideshare embed" /></p>

[View a live demo here](https://jmolivas.weknowinc.com)

## License

MIT
