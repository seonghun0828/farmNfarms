import React, { Component } from 'react'
import './SwipeableButton.css'

const slider = React.createRef();
const container = React.createRef();
const isTouchDevice = 'ontouchstart' in document.documentElement
document.addEventListener('mouseup', this.stopDrag);
document.addEventListener('mousemove', this.onDrag);
export default class SwipeableButton extends Component {

  state = {}

  componentDidMount() {
    if (isTouchDevice) {
      document.addEventListener('touchmove', this.onDrag);
      document.addEventListener('touchend', this.stopDrag);
    } else {
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    }
    this.containerWidth = container.current.clientWidth - 50;
  }
  
  onDrag = e => {
    if (this.unmounted || this.state.unlocked) return;
    if (this.isDragging) {
      if (isTouchDevice) {
        this.sliderLeft = Math.min(Math.max(0, e.touches[0].clientX - this.startX), this.containerWidth);
      } else {
        this.sliderLeft = Math.min(Math.max(0, e.clientX - this.startX), this.containerWidth);
      }
      this.updateSliderStyle();
    }
  }

  updateSliderStyle = () => {
    if (this.unmounted || this.state.unlocked) return;
    slider.current.style.left = (this.sliderLeft + 50) + 'px';
  }

  stopDrag = () => {
    if (this.unmounted || this.state.unlocked) return;
    if (this.isDragging) {
      this.isDragging = false;
      if (this.sliderLeft > this.containerWidth * 0.9) {
        this.sliderLeft = this.containerWidth;
        if (this.props.onSuccess) {
          this.props.onSuccess();
          this.onSuccess();
        }
      } else {
        this.sliderLeft = 0;
        if (this.props.onFailure) {
          this.props.onFailure();
        }
      }
      this.updateSliderStyle();
    }
  }

  startDrag = e => {
    if (this.unmounted || this.state.unlocked) return;
    this.isDragging = true;
    if (isTouchDevice) {
      this.startX = e.touches[0].clientX;
    } else {
      this.startX = e.clientX;
    }
  }

  onSuccess = () => {
    container.current.style.width = container.current.clientWidth + 'px';
    this.setState({
      unlocked: true
    })
  }

  getText = () => {
    return this.state.unlocked ? (this.props.text_unlocked || 'UNLOCKED') : (this.props.text || 'SLIDE')
  }

  reset = () => {
    if (this.unmounted) return;
    this.setState({ unlocked: false }, () => {
      this.sliderLeft = 0;
      this.updateSliderStyle();
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    return (
      <div className='ReactSwipeButton'>
        <div className={'rsbContainer ' + (this.state.unlocked ? 'rsbContainerUnlocked' : '')} ref={container}>
          <div className='rsbcSlider'
            ref={slider}
            onMouseDown={this.startDrag}
            style={{ background: this.props.color }}
            onTouchStart={this.startDrag}>
            <span className='rsbcSliderText'>{this.getText()}</span>
            <span className='rsbcSliderArrow'></span>
            <span className='rsbcSliderCircle' style={{ background: this.props.color }}></span>
          </div>
          <div className='rsbcText'>{this.getText()}</div>
        </div>
      </div>
    )
  }
}