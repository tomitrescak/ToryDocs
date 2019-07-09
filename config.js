const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://mystifying-hopper-2309bd.netlify.com',
    gaTrackingId: null
  },
  header: {
    logo:
      'https://user-images.githubusercontent.com/2682705/60425295-83f87580-9bf2-11e9-98c1-fe217070d6cc.png',
    title: 'Tory',
    githubUrl: 'https://github.com/toryjs/toryjs',
    helpUrl: '',
    tweetText: '',
    links: [{ text: '', link: '' }]
  },
  sidebar: {
    forcedNavOrder: ['/setup', '/editor', '/components'],
    links: [{ text: '', link: '' }]
  },
  siteMetadata: {
    title: 'Tory.JS | Hasura',
    description: 'Tory.JS Documentation',
    ogImage: null,
    docsLocation: 'https://github.com/toryjs/toryjs/tree/master/content',
    favicon: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg'
  }
};

module.exports = config;
