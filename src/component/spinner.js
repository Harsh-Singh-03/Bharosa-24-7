import React, { Component } from 'react'
import loading from "./loading.gif"
import "./emo.css"

export default class spinner extends Component {
  render() {
    return (
      <div className='text-center demo my-2'>
          <img src={loading} alt="loading" />
      </div>
    )
  }
}
