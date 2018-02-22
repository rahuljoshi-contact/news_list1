import React, { Component } from 'react';
import './App.css';

class StoryForm extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.cancelAction = this.cancelAction.bind(this);
    if (this.props.mode === 'edit') {
      this.state = {
        title: this.props.article.title,
        body: this.props.article.body,
        author: this.props.article.author,
        tags: this.props.article.tags,
        id: this.props.articleId,
        mode: 'edit',
        touched: {
          email: false,
          password: false,
        }
      }
    }
    else {
      this.state = {
        title: '',
        body: '',
        author: '',
        tags: '',
        touched: {
          email: false,
          password: false,
        },
      }
    }

  }

  onSubmit = (e) => {
    if (!this.canBeSubmitted()) {
      e.preventDefault();
      return;
    }

    //e.preventDefault();
    if (this.state.mode === 'edit') {
      this.props.saveAction(this.state, this.state.id);
    }
    else {
      this.props.saveAction(this.state);
    }

  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }


  handleInput = (e) => {
    //this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  cancelAction () {
    this.props.callbackParent();
  }

  canBeSubmitted() {
    const errors = validate(this.state.title, this.state.body);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }


  render () {
    const errors = validate(this.state.title, this.state.body);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <div className="form-style-5">
        <form id="story_form" onSubmit={this.onSubmit}>
          <fieldset>
          <legend><span className="number">1</span> Enter News Article:</legend>

          <label htmlFor="title"><span className="required">*</span> Title:</label>
          <input type="text" name="title" value={this.state.title}
          className={shouldMarkError('title') ? "error" : ""}
          onChange={this.handleInput}
          onBlur={this.handleBlur('title')}
          placeholder="Title of your news story" />
          <br/>

          <label htmlFor="body"><span className="required">*</span> Body:</label>
          <textarea name="body" value={this.state.body}
          onChange={this.handleInput}
          onBlur={this.handleBlur('body')}
          placeholder="Body, can have html tags but no js"></textarea>
          <br/>

          <legend><span className="number">2</span> Enter Additional Details (optional):</legend>
          <label htmlFor="Author">Author:</label>
          <input type="text" name="author" value={this.state.author} onChange={this.handleInput} placeholder="Author or source of the news" />
          <br/>

          <label htmlFor="title">Tags:</label>
          <input type="text" name="tags" value={this.state.tags} onChange={this.handleInput} placeholder="tags will be used for tag cloud" />
          <br/>

          </fieldset>
        </form>

        <button disabled={isDisabled} onClick={this.onSubmit} className="button"> Save </button>

        <button onClick={this.cancelAction} className="button">Cancel </button>

      </div>
    );
  }
} //storyForm class ends


function validate(title, body) {
  // true means invalid, so our conditions got reversed
  return {
    title: title.length === 0,
    body: body.length === 0,
  };
}

export default StoryForm ;
