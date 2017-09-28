import React from 'react'
import Leaderboard from './components/Leaderboard'
import SessionTimer from './components/SessionTimer'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/github'
import './style.css'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      results: [],
      editMode: false,
    }

    fetch('/results')
      .then(res => res.json())
      .then(results => {
        this.setState({
          results,
          nextResults: JSON.stringify(results, null, 4)
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
          {
            (this.state.editMode) ? (
              <div>
                <AceEditor
                  mode="json"
                  theme="github"
                  width="100%"
                  onChange={(nextResults) => {
                    this.setState({
                      nextResults
                    })
                  }}
                  name="editor"
                  value={this.state.nextResults}
                  editorProps={{$blockScrolling: true}}
                />

                <button
                  className="App_Button App_Button-save"
                  onClick={e => {
                    this.setState({
                      results: JSON.parse(this.state.nextResults),
                      editMode: false,
                    })

                    fetch('/results', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: this.state.nextResults,
                    })
                      .then(res => res.json())
                      .then(results => {
                        alert('Saved!')
                      })
                  }}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <Leaderboard
                  results={this.state.results}
                />
                <button
                  className="App_Button App_Button-edit"
                  onClick={e => {
                    this.setState({
                      editMode: true
                    })
                  }}
                >
                  Edit Leaderboard
                </button>
              </div>
            )
          }
        </section>
        <footer>
          <SessionTimer />
        </footer>
      </div>
    )
  }
}

export default App;
