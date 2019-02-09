import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

class DatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.handleFromDayChange = this.handleFromDayChange.bind(this)
    this.handleToDayChange = this.handleToDayChange.bind(this)

    this.state = {
      fromDate: undefined,
      toDate: undefined
    }
  }

  handleFromDayChange(selectedDay) {
    this.setState({ fromDate: selectedDay })
  }

  handleToDayChange(selectedDay) {
    this.setState({ toDate: selectedDay })
  }

  render() {
    const fromDate = this.state.fromDate
    const toDate = this.state.toDate
    return (
      <div>
        <div>
          From date: {fromDate && fromDate.toLocaleDateString()}, to date:{' '}
          {toDate && toDate.toLocaleDateString()}
        </div>
        From : <DayPickerInput onDayChange={this.handleFromDayChange} />
        To : <DayPickerInput onDayChange={this.handleToDayChange} />
      </div>
    )
  }
}

export default DatePicker
