import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import GitHubButton from 'react-github-btn';
import Link from './link';
import './styles.css';

import Sidebar from './sidebar';

let visible = false;

const Header = ({ location }) => (
  <StaticQuery
    query={graphql`
      query headerTitleQuery {
        site {
          siteMetadata {
            headerTitle
            githubUrl
            helpUrl
            tweetText
            logo
            headerLinks {
              link
              text
            }
          }
        }
      }
    `}
    render={data => {
      const logoImg = require('./images/logo.svg');
      const twitter = require('./images/twitter.svg');
      const {
        site: {
          siteMetadata: { headerTitle, githubUrl, helpUrl, tweetText, logo, headerLinks }
        }
      } = data;
      return (
        <div className={'ui grid'}>
          <div className="row">
            <div className={'ui fluid menu topBar'}>
              {/* <button
                type="button"
                className={'navbar-toggle collapsed navBarToggle'}
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className={'sr-only'}>Toggle navigation</span>
                <span className={'icon-bar'} />
                <span className={'icon-bar'} />
                <span className={'icon-bar'} />
              </button> */}
              <Link to="/" className={'ui item'} style={{ paddingLeft: '30px' }}>
                {logo !== '' ? <img src={logo} alt={'logo'} /> : <img src={logoImg} alt={'logo'} />}
                <span className="menuTitle">{headerTitle}</span>
              </Link>
              <div className="item">
                <span style={{ fontSize: '12px', color: 'white' }}> ▶︎ </span>
                <span style={{ opacity: 0.8, fontSize: '20px', color: 'white' }}>
                  &nbsp; &nbsp;Reactive fun with components!
                </span>
              </div>
              <ul className={'nav navbar-nav navBarUL'}>
                {githubUrl !== '' ? (
                  <li className={'githubBtn'}>
                    <GitHubButton
                      href={githubUrl}
                      data-show-count="true"
                      aria-label="Star on GitHub"
                    >
                      Star
                    </GitHubButton>
                  </li>
                ) : null}
                {helpUrl !== '' ? (
                  <li>
                    <a href={helpUrl}>Need Help?</a>
                  </li>
                ) : null}
              </ul>

              <div className="right menu">
                {tweetText !== '' ? (
                  <a
                    className="item"
                    href={'https://twitter.com/intent/tweet?&text=' + tweetText}
                    target="_blank"
                  >
                    <img className={'twitterIcon'} src={twitter} alt={'Twitter'} />
                  </a>
                ) : null}
                {headerLinks.map((link, key) => {
                  if (link.link !== '' && link.text !== '') {
                    return (
                      <a key={key} href={link.link} className="item" target="_blank">
                        {link.text}
                      </a>
                    );
                  }
                })}
                <div className="item">
                  <button
                    className="ui icon button"
                    onClick={() => {
                      document.getElementById('mobileNav').style.height = visible ? 'auto' : '0px';
                      visible = !visible;
                    }}
                  >
                    <i className="bars icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mobile only row"
            style={{ marginTop: '-28px', height: '0px', overflow: 'hidden' }}
            id="mobileNav"
          >
            <Sidebar location={location} />
          </div>
        </div>
      );
    }}
  />
);

export default Header;
