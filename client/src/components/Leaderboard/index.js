import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.css'

class Leaderboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sortColumn: 'overall'
    }
  }

  changeSortColumn(columnName) {
    this.setState({
      sortColumn: columnName
    })
  }

  render() {
    const { sortColumn } = this.state
    const { results } = this.props

    const calculatedResults = results
      .map(result => Object.assign({}, result, {
        overall: result.science + result.technology + result.engineering + result.maths
      }))

    const sortedResults = calculatedResults
      .sort((resultA, resultB) => {
        if (sortColumn === 'school') {
          const schoolA = resultA.school.toLowerCase()
          const schoolB = resultB.school.toLowerCase()

          if (schoolA < schoolB) return -1
          if (schoolA > schoolB) return 1
          return 0
        }

        return resultB[sortColumn] - resultA[sortColumn]
      })

    return (
      <table className="Leaderboard">
        <thead>
          <tr>
            <th
              onClick={e => this.changeSortColumn('school')}
              className={classnames({
                active: sortColumn === 'school'
              })}
            >
              School
            </th>
            <th
              onClick={e => this.changeSortColumn('science')}
              className={classnames({
                active: sortColumn === 'science'
              })}
            >
              S
            </th>
            <th
              onClick={e => this.changeSortColumn('technology')}
              className={classnames({
                active: sortColumn === 'technology'
              })}
            >
              T
            </th>
            <th
              onClick={e => this.changeSortColumn('engineering')}
              className={classnames({
                active: sortColumn === 'engineering'
              })}
            >
              E
            </th>
            <th
              onClick={e => this.changeSortColumn('maths')}
              className={classnames({
                active: sortColumn === 'maths'
              })}
            >
              M
            </th>
            <th
              onClick={e => this.changeSortColumn('overall')}
              className={classnames({
                active: sortColumn === 'overall'
              })}
            >
              Overall
            </th>
          </tr>
        </thead>
        <tbody>
          {
            sortedResults.map((result, index) => (
              <tr key={index}>
                <td>{ result.school }</td>
                <td>{ result.science }</td>
                <td>{ result.technology }</td>
                <td>{ result.engineering }</td>
                <td>{ result.maths }</td>
                <td>{ result.overall }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

Leaderboard.propTypes = {
  results: PropTypes.array
}

Leaderboard.defaultProps = {
  results: []
}

export default Leaderboard
