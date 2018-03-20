import React, {Component, Fragment} from 'react'
import {render} from 'react-dom'
import {css} from 'emotion'

import Drawer from '../../src'

const bigArray = new Array(500).fill(true)

class Demo extends Component {
  state = {
    regular: false,
    jsScroll: false,
    jsScrollAsyncHeight: false
  }

  toggle = (type, value) => event => {
    this.setState((state) => {
      return {
        [type]: value
      }
    })
  }

  getAsyncChildren = () => {
    setTimeout(() => {
      const asyncChildren = bigArray.map((_, index) => <div key={index}>{index}</div>)
      this.setState({asyncChildren})
    }, 400)
  }

  render() {
    const { regular, jsScroll, jsScrollAsyncHeight} = this.state
    return (
      <Fragment>
        <div className={ButtonContainer}>
          <button onClick={this.toggle('regular', true)} className={Toggle}>Open drawer!</button>
          {/* <br />
          <br />
          <button onClick={this.toggle('jsScroll', true)} className={Toggle}>Huge drawer with kinetic scrolling!</button>
          <br />
          <br />
          <button onClick={this.toggle('jsScrollAsyncHeight', true)} className={Toggle}>Huge drawer with async height</button> */}
        </div>

        <Drawer
          open={regular}
          onRequestClose={this.toggle('regular', false)}
          modalElementClass={ModalElement}
        >
          <div className={Card}>
            I'm in a drawer!
            <button className={Toggle} onClick={this.toggle('regular', false)}>Close drawer</button>
          </div>
        </Drawer>

        {/* <Drawer
          kinetic={true}
          open={jsScroll}
          onRequestClose={this.toggle('jsScroll', false)}
          modalElementClass={HugeList}
        >
          <div className={Card}>
            <button className={Toggle} onClick={this.toggle('jsScroll', false)}>Close drawer</button>
            <div className={Content}>{bigArray.map((_, index) => <div key={index}>{index}</div>)}</div>
          </div>
        </Drawer>


        <AsyncHeightDrawer
          open={jsScrollAsyncHeight}
          onRequestClose={this.toggle('jsScrollAsyncHeight', false)}
          modalElementClass={HugeList}
        /> */}
      </Fragment>
    )
  }
}

class AsyncHeightDrawer extends Component {
  state = {
    asyncData: []
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.open === false && nextProps.open === true) {
      setTimeout(() => {
        const newArray = new Array(500).fill(true)

        this.setState({ asyncData: newArray })
      }, 1500)
    }

    if (nextProps.open === false && this.props.open) {
      this.setState({ asyncData: [] })
    }
  }

  render () {
    console.log(this.state.asyncData)
    return (
      <Drawer kinetic={true} {...this.props}>
        <div className={Card}>
          <button className={Toggle} onClick={this.props.onRequestClose}>Close drawer</button>
          <br />
          <div className={Content}>{this.state.asyncData.length === 0 ? <div>Loading...</div> : this.state.asyncData.map((_, index) => <div key={index}>{index}</div>)}</div>
        </div>
      </Drawer>
    )
  }
}

const Content = css`
  background-color: white;
`

const Card = css`
  background-color: white;
  width: 375px;
  height: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-radius: 4px;
  max-width: 100%;
  max-height: 100%;

  @media(max-width: 767px) {
    margin-top: 100px;
  }

  @media(min-width: 768px) {
    height: 300px;
    margin: 0 auto;
    border-radius: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  button {
    margin-top: 50px;
  }
`

const Toggle = css`
  background-color: #d50152;
  border-radius: 4px;
  color: white;
  border: 0;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  transition: all 0.25s linear;

  &:active {
    transform: scale(0.9);
  }
`

const ModalElement = css`
  text-align: center;

  @media(max-width: 767px) {
    height: 100%;
    width: 100%;
  }
`

const HugeList = css`
  text-align: center;
  height: 100%;

  @media(max-width: 767px) {
    width: 100%;
  }
`

const ButtonContainer = css`
  margin: 200px auto 0;
  width: 100%;
  text-align: center;
`

render(<Demo/>, document.querySelector('#demo'))
