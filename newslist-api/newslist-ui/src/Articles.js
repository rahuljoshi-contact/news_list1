import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import update from 'immutability-helper';
import StoryForm from './StoryForm.js';
import Story from './Story.js';


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
      this.setState({articles: response.data})
    })
    .catch(error => console.log(error));
  }

  handleNew () {
    this.setState({mode: 'new'}) ;
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
      this.setState({articles: articles, mode: 'display', editingArticleId:''})
    })
    .catch(error => console.log(error))

  }

  editStory = (data, id) => {
    const article = {
      id: data.id,
      title: data.title,
      body: data.body,
      tags: data.tags,
      author: data.author
    }
    axios.put(`https://news-list1.herokuapp.com/articles/${data.id}`,  {article: article} )
    .then(response => {
      const articleIndex = this.state.articles.findIndex(x => x.id === id)
      article.created_at = this.state.articles[articleIndex].created_at;
      article.updated_at = this.state.articles[articleIndex].updated_at;
      const articles = update(this.state.articles, {[articleIndex]: { $set: article }})
      this.setState({articles: articles, mode: 'display', editingArticleId: ''})
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
            this.state.articles.map((article, i) => <Story article={article} key={i} handleEdit={this.handleEdit}
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
      return (
        <div>
          <StoryForm mode={'edit'}
          articleId={this.state.editingArticleId}
          article={article}
          callbackParent={this.cancelStory}
          saveAction={this.editStory}/>
        </div>
      )
    }
  }

} //Articles class ends






export default Articles ;
