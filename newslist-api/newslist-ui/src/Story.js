import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import update from 'immutability-helper';

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
      <tr>
        <td colSpan="2" className="author"><label className="label">Source: </label>{this.props.article.author}</td>
      </tr>
        <tr className="mainRow">
          <td colSpan="3" className="title">{this.props.article.title}</td>
          <td colSpan="2" className="menu"><button className="button" onClick={this.handleEdit}>Edit</button></td>
          <td colSpan="1" className="menu"><button className="button" onClick={this.handleDelete}>Delete</button></td>
        </tr>
        <tr className="bodyRow">
          <td colSpan="3" className="body">{this.props.article.body}
          </td>
        </tr>
        <tr className="info">
          <td colSpan="1" className="date"><label className="label">Posted on: </label>{this.props.article.created_at}</td>
          <td colSpan="1" className="source"><label className="label">Tags: </label>{this.props.article.tags}</td>
        </tr>
      </tbody>
      </table>

      </div>
    );
  }
}

export default Story ;
