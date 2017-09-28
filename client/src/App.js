import React from 'react'
import Leaderboard from './components/Leaderboard'
import SessionTimer from './components/SessionTimer'
import './style.css'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      results: []
    }

    fetch('/results')
      .then(res => res.json())
      .then(results => {
        this.setState({
          results
        })
      })
  }

  render() {
    return (
      <div className="App">
        <header>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <img src="https://www.peterboroughstemfestival.co.uk/wp-content/uploads/sites/6/2017/01/dpip_stem_logo_final_colour_simplified_2017.png" alt="Logo" height="100" />
            <img src="https://www.peterboroughstemfestival.co.uk/wp-content/uploads/sites/6/2017/09/AngliaWaterOne_72dpi.jpg" height="100"/>
          </div>
          <h1>Leaderboard</h1>
        </header>
        <section>
          <Leaderboard
            results={this.state.results}
          />
        </section>
        <footer>
          <SessionTimer />
        </footer>
      </div>
    )
  }
}

export default App;
