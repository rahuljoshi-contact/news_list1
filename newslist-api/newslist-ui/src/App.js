import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import update from 'immutability-helper'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Articles />
      </div>
    );
  }
} //app class ends

class Articles extends Component {
  
  constructor (props) {
    super(props);
    this.handleNew = this.handleNew.bind(this);
    this.cancelStory = this.cancelStory.bind(this);
    this.saveStory = this.saveStory.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.findElement = this.findElement.bind(this);

    this.state = {
      mode: 'display',
      articles: [],
      editingArticleId: '',
      notification: '' 
    };
  }
  
  componentDidMount() {
      axios.get('https://news-list1.herokuapp.com/articles')
    .then(response => {
      console.log(response)
      this.setState({articles: response.data})
    })
    .catch(error => console.log(error));
  }
  
  handleNew () {
    this.setState({mode: 'new'}) ;
    console.log('App.handleNew: mode: '+ this.state.mode);
  }

  cancelStory = () => {
    this.setState({mode: 'display'});
  }

  saveStory = (data) => {
    const article = {
      title: data.title, 
      body: data.body,
      tags: data.tags,
      author: data.author
    }
    axios.post(`https://news-list1.herokuapp.com/articles`,  {article: article} )
    .then(response => {
      const articles = update(this.state.articles, { $splice: [[0, 0, response.data]]})
      this.setState({articles: articles, mode: 'display'})
    })
    .catch(error => console.log(error))

  }

  editStory = (data, id) => {
    console.log('Article.editStory, id: ' + id);
    const article = {
      title: data.title, 
      body: data.body,
      tags: data.tags,
      author: data.author
    }
    axios.put(`https://news-list1.herokuapp.com/articles/${data.id}`,  {article: article} )
    .then(response => {
      const articles = update(this.state.articles, { $splice: [[0, 0, response.data]]})
      this.setState({articles: articles, mode: 'display'})
    })
    .catch(error => console.log(error))


  }

  handleEdit (id, mode) {
    this.setState({mode: 'edit', editingArticleId: id}) ;
  }

  handleDelete (id, mode) {
    if (mode === 'delete') {
      axios.delete(`https://news-list1.herokuapp.com/articles/${id}`)
        .then(response => {
      const ideaIndex = this.state.articles.findIndex(x => x.id === id)
      const ideas = update(this.state.articles, { $splice: [[ideaIndex, 1]]})
      this.setState({articles: ideas, mode: 'display'})
    })
    .catch(error => console.log(error))

    }
  }

  findElement = (arr, propName, propValue) => {
    for (var i=0; i < arr.length; i++)
      if (arr[i][propName] === propValue)
        return arr[i];

    // will return undefined if not found; you could return a default instead
  }


  render () {
    
    if (this.state.mode === 'display') {
      return (
        <div className="container">
          <h1>News Articles</h1>
          <button className="button" onClick={this.handleNew}>New</button>
          {
            this.state.articles.map((article) => <Story article={article} key={article.id} handleEdit={this.handleEdit} 
              callbackParent={this.handleDelete} />)
          }
        </div>
      );
    }
    else if (this.state.mode === 'new') {
      return (
        <div>
          <StoryForm mode={'new'} callbackParent={this.cancelStory} saveAction={this.saveStory}/>
        </div>
      )
    }
    else if (this.state.mode === 'edit' && this.state.editingArticleId) {
      //var article = this.state.articles[this.state.editingArticleId-1]
      var article = this.findElement(this.state.articles, 'id', this.state.editingArticleId);
      console.log(article);
      return (
        <div>
          <StoryForm mode={'edit'} articleId={this.state.editingArticleId} article={article} callbackParent={this.cancelStory} saveAction={this.editStory}/>
        </div>
      )
    }
  }
  
} //Articles class ends

function validate(title, body) {
  // true means invalid, so our conditions got reversed
  return {
    title: title.length === 0,
    body: body.length === 0,
  };
}

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
      console.log(this.state);
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


class Story extends Component {

  constructor(props){
    super(props); 
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete = () => { 
    this.props.callbackParent(this.props.article.id, 'delete') ;
    
  }

  handleEdit () {
    this.props.handleEdit(this.props.article.id, 'edit') ;
  }

  render () {
    return (
      <div className="container">
      <table className="mainTable">
      <tbody>
        <tr className="mainRow">
          <td colSpan="3" className="title">{this.props.article.title}</td>
          <td colSpan="2" className="menu"><button className="button" onClick={this.handleEdit}>Edit</button></td>
          <td colSpan="1" className="menu"><button className="button" onClick={this.handleDelete}>Delete</button></td>
        </tr>
        <tr className="info">
          <td colSpan="1" className="author"><label className="label">Author: </label>{this.props.article.author}</td>
          <td colSpan="1" className="date"><label className="label">Posted on: </label>{this.props.article.created_at}</td>
          <td colSpan="1" className="source"><label className="label">Tags: </label>{this.props.article.tags}</td>
        </tr>
        <tr className="bodyRow">
          <td colSpan="3" className="body">{this.props.article.body} 
          </td>
        </tr>
      </tbody>
      </table>  

      </div>
    );
  }
}


export default App;
