import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {constants} from './../../helpers';
import PropTypes from 'prop-types';
import postReview from './../../api/reviews';

class Form extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      comment: ``,
      rating: null,
      isBtnDisabled: true
    };

    this._typeReview = this._typeReview.bind(this);
    this._isBtnDisabled = this._isBtnDisabled.bind(this);
    this._ratingSelect = this._ratingSelect.bind(this);
    this._sendReview = this._sendReview.bind(this);
  }

  render() {
    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={(evt) => {
          evt.preventDefault();
          this._sendReview(this.props.activeAppartment.id);
        }
        }
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating" onChange={this._ratingSelect}>
          <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          onChange={this._typeReview}
        ></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={this.state.isBtnDisabled}>Submit</button>
        </div>
      </form>
    );
  }

  _typeReview(evt) {
    const val = evt.target.value;

    this.setState({
      comment: val
    });

    this._isBtnDisabled(val, this.state.rating);
  }

  _ratingSelect(evt) {
    const val = evt.target.value;

    this.setState({
      rating: val
    });

    this._isBtnDisabled(this.state.comment, val);
  }

  _isBtnDisabled(text, rating) {
    const {REVIEW_TEXT_LIMITS} = constants;
    const reviewLen = text.length + 1;

    this.setState({
      isBtnDisabled: !(reviewLen >= REVIEW_TEXT_LIMITS.min && reviewLen <= REVIEW_TEXT_LIMITS.max && !!rating)
    });
  }

  _resetForm() {
    document.querySelector(`.reviews__form`).reset();
  }

  _sendReview(activeAppartment) {
    const {comment, rating} = this.state;

    this.setState({
      isBtnDisabled: true
    });

    postReview(
        activeAppartment,
        {comment, rating},
        this._resetForm,
        () => {
          this.setState({isBtnDisabled: false});
        }
    );
  }
}

Form.propTypes = {
  sendReview: PropTypes.func,
  activeAppartment: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    activeAppartment: state.data.activeAppartment
  };
};

export {Form};

export default connect(
    mapStateToProps,
    null
)(Form);
