import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {constants} from '../../helpers';

interface Props {
  user: {
    [key: string]: string,
  };
  isUserAuthorized: boolean;
}

const Header = (props: Props) => {
  const {user, isUserAuthorized} = props;
  const profile = (user.email) ? user.email : `Sign in`;
  const avatar = (user.avatar_url) ? constants.BASE_URL + user.avatar_url : `/103788-six-cities-1/img/avatar.svg`;
  const link = (isUserAuthorized) ? `/favorites` : `/login`;

  return (
    <React.Fragment>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="/103788-six-cities-1/img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to={link} className="header__nav-link header__nav-link--profile">
                    <div
                      className="header__avatar-wrapper user__avatar-wrapper"
                      style={{backgroundImage: `url(` + avatar + `)`}}
                    >
                    </div>
                    <span className="header__user-name user__name">{profile}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    isUserAuthorized: state.user.isUserAuthorized
  };
};

export {Header};

export default connect(
    mapStateToProps,
    null
)(Header);
