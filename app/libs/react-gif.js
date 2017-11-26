// Credit to library bug: https://github.com/cezary/react-gif/issues/4

import React, { Component, PropTypes } from 'react';
import Exploder from 'exploder';

class Gif extends Component {
  static defaultProps = {
    onError: () => {},
    onLoad: () => {},
    pingPong: false,
    playing: true,
    reverse: false,
    speed: 1
  };

  static propTypes = {
    onError: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    pingPong: PropTypes.bool.isRequired,
    playing: PropTypes.bool.isRequired,
    reverse: PropTypes.bool,
    speed: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    src: PropTypes.string.isRequired,
    times: PropTypes.number
  };

  constructor() {
    super();
    this.state = {
      currentFrame: 0,
      frames: [],
      length: 0,
      offsets: [],
      paused: false
    };
  }

  componentDidMount() {
    if (this.props.src) {
      this.explode(this.props.src);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.explode(nextProps.src);
    }

    if (!this.props.playing && nextProps.playing) {
      this.start();
    } else {
      this.pause();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // if stopped is toggled off
    //if (prevState.stopped === true && this.state.stopped === false) {
      //this.animationLoop();
    //}

    // if startTime is updated
    if ((prevState.startTime !== this.state.startTime) && this.animationLoop) {
      this.animationLoop();
    }
  }

  explode(url) {
    const exploder = new Exploder(url);
    exploder.load().then((gif) => {
      this.props.onLoad(this);
      this.gif = gif;
      this.setState(gif);
      this.startSpeed()
      this.start();
    });
  }

  startSpeed() {
    this.animationLoop = () => {
      const gifLength = 10 * this.state.length / this.props.speed;
      const duration = performance.now() - this.state.startTime;
      const repeatCount = duration / gifLength;

      let fraction = repeatCount % 1;
      if (this.props.reverse) {
        fraction = 1 - fraction;
      }

      if (this.state.paused) {
        return;
      }

      if (this.state.stopped || repeatCount >= this.props.times) {
        this.setState({
          currentFrame: this.gif.frameAt(0)
        });
        return;
      }

      const currentFrame = (this.props.pingPong && repeatCount % 2 >= 1) ? this.gif.frameAt(1 - fraction) : this.gif.frameAt(fraction);

      this.setState({ currentFrame });
      requestAnimationFrame(this.animationLoop);
    }
  }

  start = () => {
    const gifLength = 10 * this.state.length / this.props.speed;
    let startTime;

    if (this.state.paused) {
      const offset = (this.state.pausedTime - this.state.startTime) % gifLength;
      startTime = performance.now() - offset;
    } else {
      startTime = performance.now();
    }

    this.setState({
      paused: false,
      pausedTime: undefined,
      startTime: startTime
    });
  }

  pause = () => {
    this.setState({
      paused: true,
      pausedTime: performance.now()
    });
  }

  renderFrames = () => {
    const frameStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      WebkitTransform: 'translateZ(0)',
      msTransform: 'translateZ(0)',
      transform: 'translateZ(0)'
    };

    return this.state.frames.map((frame, index) => {
      const opacity = this.state.currentFrame >= index ? 1 : 0;
      const position = index === 0 ? 'static' : frameStyle.position;
      const style = { ...frameStyle, opacity, position };

      return <img key={index} src={frame.url} className='frame' style={style} />
    });
  }

  render() {
    const framesStyle = {
      display: 'block',
      position: 'relative'
    };

    return <div className='frames' style={framesStyle}>{this.renderFrames()}</div>;
  }
}

export default Gif;
