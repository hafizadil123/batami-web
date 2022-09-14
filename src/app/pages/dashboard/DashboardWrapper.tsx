/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import axios from 'axios'
import { PageTitle } from '../../../_metronic/layout/core'
import './tabs.css'
const DashboardPage: FC = () => {

  const [responseMessage, setResponseMessage] = useState('');
  const [isStartDisabled, setStartDisabled] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isEndDisabled, setEndDisabled] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const [workActivityCodeItems, setWorkActivityCodeItems] = useState([]);
  const [responseStatus, setResponseStatus] = useState<any>(false)

  const logged_user_detail: any = localStorage.getItem('logged_user_detail');
  const loggedInUserDetails = JSON.parse(logged_user_detail);

  const baseUrl = process.env.REACT_APP_API_URL;
  const getDailyAttendanceEndpoint = `${baseUrl}/api/Inner/GetAttendanceDaily`;
  const saveStartShiftEndpoint = `${baseUrl}/api/Inner/SaveStartShift`;
  const saveEndShiftEndpoint = `${baseUrl}/api/Inner/SaveEndShift`;
  const headerJson = {
    headers: {
      Authorization: `bearer ${loggedInUserDetails.access_token}`
    }
  }

  useEffect(() => {
    getDailyAttendance();
  }, []);

  const setStartTimeStatus = (time: any) => {
    setStartDisabled(time != null);
    setStartTime(time)
  }

  const setEndTimeStatus = (time: any) => {
    console.log('Time : ', time);
    setEndDisabled(time != null);
    setEndTime(time)
  }

  const getDailyAttendance = async () => {
    const response = await axios.post(getDailyAttendanceEndpoint, {}, headerJson)

    if (response && response.data) {
      const { data } = response;
      console.log({data})
      const { result, message, latestStartTime, latestEndTime, workActivityItems } = data;
      setResponseStatus(result);
      if (result) {
        setStartTimeStatus(latestStartTime)
        setEndTimeStatus(latestEndTime)
        // eslint-disable-next-line no-lone-blocks
        if (workActivityItems && workActivityItems.length) {
          setWorkActivityCodeItems(workActivityItems)
          setSelectedOption(workActivityItems[0].id)
        }
      }
      setResponseMessage(message)
    }
  }

  const saveStartShiftTiming = async () => {
    const response = await axios.post(saveStartShiftEndpoint, {
      workActivityCode: selectedOption
    }, headerJson)

    if (response && response.data) {
      const { data } = response;
      const { result, message } = data;
      setResponseStatus(result);
      if (result) {
        setStartTimeStatus(data.time)
      }
      setResponseMessage(message)
    }
  }

  const saveEndShiftTiming = async () => {
    const response = await axios.post(saveEndShiftEndpoint, {
      workActivityCode: selectedOption
    }, headerJson)

    if (response && response.data) {
      const { data } = response;
      const { result, message } = data;
      setResponseStatus(result);
      if (result) {
        setEndTimeStatus(data.time)
      }
      setResponseMessage(message)
    }
  }

  const handleChange =(id:any) => (event: any) => {
    console.log(id)
    // console.log('SelectedValue : ', event.target.value);
    setSelectedOption(id);
  }
const getSelectedClass =(id:any)=>{
  if(id==selectedOption){
    return `active-tab`
  }else{
    return `general-tab`
  }
}
  return <>
    <div className='main-container-dashboard'>

      <ul style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer"}} className="nav nav-tabs nav-tabs-line mb-7">
      {workActivityCodeItems && workActivityCodeItems.length && workActivityCodeItems.map(({id,name})=>{

          return (

            <li key={id} className="nav-item" onClick={handleChange(id)}>
               <span className={`nav-link tab ${getSelectedClass(id)} ` }  data-toggle="tab" >{`${name}`}</span>
            </li>
    
          )
      })} 
        {/* <li className="nav-item">
          <span className="nav-link tab active-tab" data-toggle="tab" >Active</span>
        </li>
        <li className="nav-item">
        <span className="nav-link tab general-tab" data-toggle="tab" >New Tab</span>
        </li> */}

      </ul>


      {/* {workActivityCodeItems && workActivityCodeItems.length && <select
        aria-label=''
        data-control='select2'
        data-placeholder='Work Activity Code'
        className='form-select form-select-sm form-select-solid'
        disabled={false}
        value={selectedOption}
        onChange={handleChange}>
        {
          workActivityCodeItems.map(({ id, name }) => <option value={id}>{`${name}`}</option>)
        }
      </select>
      } */}

      <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px", cursor: "pointer" }}>
        
        <button
        style={{marginLeft:'100px'}}
          onClick={() => {
            if (selectedOption && startTime != null) {
              saveEndShiftTiming()
            } else {
              setResponseMessage('חובה לבחור ערך בשדה פעילות');
            }
          }}
          disabled={isEndDisabled}
          type='submit'
          id='exit_time_button'
          className='btn btn-lg btn-secondary w-170-px mb-5'>
          {isEndDisabled ? endTime : `יציאה`}
        </button>
        <button
          type='submit'
          id='entrance_time_button'
          className='btn btn-lg btn-primary mb-5 w-170-px'
          disabled={isStartDisabled || responseMessage != null}
          onClick={() => {
            if (selectedOption) {
              saveStartShiftTiming()
            } else {
              setResponseMessage('חובה לבחור ערך בשדה פעילות');
            }
          }}>
          {isStartDisabled ? startTime : `כניסה`}
        </button>
      </div>
      {responseMessage && <div
        style={{
          background: responseStatus ? '#4CAF50' : '#EF5350',
          color: 'white',
          padding: '5px',
          textAlign: 'center'
        }}>{responseMessage}</div>}
    </div>
  </>
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage />
    </>
  )
}

export { DashboardWrapper }
