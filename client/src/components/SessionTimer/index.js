import React from 'react'
import moment from 'moment'
import './style.css'

class SessionTimer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      timeRemaining: null
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.state.timeRemaining === null) return 0
      if (this.state.timeRemaining === 0) {
        clearInterval(this.timer)
        return 0
      }

      this.setState({
        timeRemaining: this.state.timeRemaining - 1
      })
    }, 1000)
  }

  render() {
    const { timeRemaining } = this.state

    if (timeRemaining === null) {
      return (
        <div className="SessionTimer">
          <input
            ref={(input) => this.input = input}
            type="number"
            placeholder="Minutes"
          />
          <button
            onClick={e => {
              if (!this.input.value) return

              this.setState({
                timeRemaining: this.input.value * 60
              })

              this.startTimer()
            }}
          >
            Start Session
          </button>
        </div>
      )
    }

    if (timeRemaining === 0) {
      return (
        <div className="SessionTimer">
          <h1>Time's Up!</h1>
          <button
            onClick={e => {
              this.setState({
                timeRemaining: null
              })
            }}
          >
            Reset
          </button>
        </div>
      )
    }

    return (
      <div className="SessionTimer">
        <h1>{moment.duration(timeRemaining, 'seconds').minutes()} minutes, {moment.duration(timeRemaining, 'seconds').seconds()} seconds remaining</h1>
      </div>
    )
  }
}

export default SessionTimer
