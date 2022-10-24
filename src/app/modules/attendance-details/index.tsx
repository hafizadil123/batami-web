import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import ReactPaginate from 'react-paginate'
import Summary from './components/Summary'
const AttendanceDetails = () => {
  const [data, setData] = useState([])
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
  const authHeader = {
    headers: {
      Authorization: `bearer ${loggedInUserDetails.access_token}`,
    },
  }

  useEffect(() => {
    getAttendanceSummary()
  }, [])

  const getAttendanceSummary = async () => {
    let dataToSend = {
      month: 9,
      year: 2022,
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
    }
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            background: '#fff',
          }}
        >
          <Summary data={summaryData} />
        </div>
      </div>
    </>
  )
}

export default AttendanceDetails
