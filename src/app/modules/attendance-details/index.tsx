import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import ReactPaginate from 'react-paginate'
import Summary from './components/Summary'
import Table from './components/Table'
import {useParams} from 'react-router-dom'
import moment from 'moment'
const AttendanceDetails = (props: any) => {
  const [absenceTypes, setAbsenceTypeItems] = useState<any>()
  const [days, setDays] = useState<any>([])
  const [summaryData, seStummaryData] = useState({
    volunteerName: '',
    volunteerNumber: '',
    idNumber: '',
    coordinatorName: '',
    instituteName: '',
    reportMonth: '',
    totalWorkTime: '',
    totalWorkingDays: '',
    volunteerWeeklyHours: '',
    volunteerWorkTime: '',
    totalMonthTime: '',
    workTimeDiff: '',
    month: '',
    year: '',
  })
  const logged_user_detail: any = localStorage.getItem('logged_user_detail')
  const loggedInUserDetails = JSON.parse(logged_user_detail)

  const baseUrl = process.env.REACT_APP_API_URL
  const getAttendanceSummaryEndpoint = `${baseUrl}/api/Inner/GetMonthlyAttendanceDetails`
  const getDataEntPoint = `${baseUrl}/api/Inner/GetData`

  const authHeader = {
    headers: {
      Authorization: `bearer ${loggedInUserDetails.access_token}`,
    },
  }
  let {month, year} = useParams()
  useEffect(() => {
    getAttendanceSummary()
    getAbsenceTypes()
  }, [])
  // const getDataApi = async () => {
  //   const response = await axios.post(getDataEntPoint, {}, authHeader)

  //   if (response && response.data) {
  //     const {data} = response
  //     const {absenceTypes, buttonHebrewTexts, banks} = data
  //     setAbsenceTypeItems(absenceTypes)
  //   }
  // }
  const getAbsenceTypes = () => {
    const s = localStorage.getItem('absenceTypes') || ''
    const absenceTypes = JSON.parse(s)
    console.log(absenceTypes)
    setAbsenceTypeItems(absenceTypes)
  }

  const getAttendanceSummary = async () => {
    let dataToSend = {
      month,
      year,
    }
    const response = await axios.post(getAttendanceSummaryEndpoint, dataToSend, authHeader)
    if (response && response.data.result) {
      const {data} = response
      console.log({data})
      const {
        volunteerName,
        volunteerNumber,
        idNumber,
        coordinatorName,
        instituteName,
        reportMonth,
        totalWorkTime,
        totalWorkingDays,
        volunteerWeeklyHours,
        volunteerWorkTime,
        totalMonthTime,
        workTimeDiff,
        month,
        year,
      } = data
      seStummaryData({
        volunteerName,
        volunteerNumber,
        idNumber,
        coordinatorName,
        instituteName,
        reportMonth,
        totalWorkTime,
        totalWorkingDays,
        volunteerWeeklyHours,
        volunteerWorkTime,
        totalMonthTime,
        workTimeDiff,
        month,
        year,
      })
      let newDays = data.days.map((day: any) => {
        const {startTime2, startTime3, startTime4, startTime5} = day
        const itemCount = getCount(startTime2, startTime3, startTime4, startTime5)
        return {
          ...day,
          itemCount: itemCount,
          currentCount: 5,
        }
      })
      console.log({newDays})
      setDays(newDays)
    }
  }
  const getCount = (startTime2: any, startTime3: any, startTime4: any, startTime5: any) => {
    let count = 1
    if (startTime2) {
      count++
    }
    if (startTime3) {
      count++
    }
    if (startTime4) {
      count++
    }
    if (startTime5) {
      count++
    }
    return count
  }
  const updateCount = (date: string) => {
    console.log(date, 'update count')
    const updatedDays = days.map((item: any) => {
      if (item.date == date) {
        let newCount = item.itemCount
        newCount++
        item.itemCount = newCount
        return item
      } else {
        return item
      }
    })
    setDays(updatedDays)
  }
  const updateDataHandler = (date: any, key: string, value: any) => {
    const updatedDays = days.map((item: any) => {
      if (item.date == date) {
        console.log({date, key, value})
        console.log('found')
        item[key] = value
        return item
      } else {
        return item
      }
    })
    setDays(updatedDays)
  }
  const getTimeDifference = () => {
    var startTime: any = moment('01:16', 'HH:mm')
    var endTime: any = moment('18:12', 'HH:mm')
    var duration: any = moment.duration(endTime.diff(startTime))
    var hours = parseInt(duration.asHours())
    var minutes = parseInt(duration.asMinutes()) - hours * 60
    console.log(hours + ' hour and ' + minutes + ' minutes.')
    return hours + ':' + minutes
  }
  function addTimes(times: any) {
    let duration = 0
    times.forEach((time: any) => {
      duration = duration + moment.duration(time).as('milliseconds')
    })
    return moment.utc(duration).format('HH:mm')
  }

  const updateWorkActivitItemsHandler = (
    date: any,
    key1: string,
    key2: string,
    value: any,
    value2: any
  ) => {
    const updatedDays = days.map((item: any) => {
      if (item.date == date) {
        console.log({date, key1, key2, value, value2})
        console.log('found')
        item[key1] = value
        item[key2] = value2
        return item
      } else {
        return item
      }
    })
    setDays(updatedDays)
  }

  return (
    <>
      <div
        style={{
          border: '1px solid #EFF2F5',
          background: '#fff',
          padding: '10px',
          boxShadow: '0 0px 10px rgb(0 0 0 / 20%)',
        }}
      >
        <div className='row'>
          <Summary data={summaryData} />
          <Table
            days={days}
            absenceTypes={absenceTypes}
            updateDataHandler={updateDataHandler}
            updateWorkActivitItemsHandler={updateWorkActivitItemsHandler}
            updateCount={updateCount}
          />
        </div>
      </div>
    </>
  )
}

export default AttendanceDetails
