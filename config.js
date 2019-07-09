const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://toryjs.com',
    gaTrackingId: 'UA-143536266-1'
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
    forcedNavOrder: ['/setup', '/components'],
    links: [{ text: '', link: '' }]
  },
  siteMetadata: {
    title: 'Tory.JS | Website development has never been this much fun!',
    description: 'Tory.JS Documentation',
    ogImage: null,
    docsLocation: 'https://github.com/toryjs/toryjs/tree/master/content',
    favicon:
      'https://user-images.githubusercontent.com/2682705/60425295-83f87580-9bf2-11e9-98c1-fe217070d6cc.png'
  }
};

module.exports = config;
