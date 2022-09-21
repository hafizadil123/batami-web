/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import axios from 'axios'
import moment from 'moment'
import DataTable, { createTheme } from 'react-data-table-component';
import { PageTitle } from '../../../_metronic/layout/core'
import './tabs.css'
import {ShowDataTable} from './ShowDataTable'
const DashboardPage: FC = () => {
  const todaysDate = moment( new Date()).format("YYYY-MM-DD");
  const [responseMessage, setResponseMessage] = useState('');
  const [note, setNote] = useState('');
  const [isStartDisabled, setStartDisabled] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isEndDisabled, setEndDisabled] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [existingData, setExistingData] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [activeRow,setActiveRow]=useState('attendance');
  const [activeTab,setActiveTab] = useState('attendance');
  const [absenceTypeItems,setAbsenceTypeItems] = useState([]);
  const [hebrewButtons,setHebrewButtons]=useState({ButtonAbsenceAllDay:"",ButtonAbsenceEnd:"",ButtonAbsenceStart:"",ButtonAttendanceEnd:"",ButtonAttendanceStart:"",ButtonSickAllDay:"",ButtonSickEnd:"",ButtonSickStart:""})
  const [buttonActions,setButtonActions]=useState({allowAbsenceAllDay:false,allowAbsenceEnd:false,allowAbsenceStart:false,allowAttendanceEnd:false,allowAttendanceStart:false,allowSickAllDay:false,allowSickEnd:false,allowSickStart:false})
  const [workActivityCodeItems, setWorkActivityCodeItems] = useState([]);
  const [latestStartTime,setLatestStartTime]=useState(null);
  const [activeAbsenceType,setActiveAbsenceType]=useState("");
  const [responseStatus, setResponseStatus] = useState<any>(false)
  const [tabs,setTabs] =useState([
   {
     id:1,
     label:"נוכחות",
     name: 'attendance',
   },
   {
     id:2,
     label:"היעדרות",
     name:'absence',
     
   },
   {
     id:3,
     name:'sick',
     label:"מחלה"
   }
  ]);
  createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    // background: {
    //   default: '#002b36',
    // },
    context: {
      // background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'light');
  const tableColumns = [
    {
      name: 'פעילות',
      selector: (row: any) => row.activity,
      sortable: true,
    },
    {
      name: "שעת התחלה",
      selector: (row: any) => row.startTime,
      sortable: true,
    },
    {
      name: "שעת סיום",
      selector: (row: any) => row.endTime,
      sortable: true,
    },
    {
      name: "סוג היעדרות",
      selector: (row: any) => row.absenceName,
      sortable: true,
    },

    {
      name: 'הערה לפעילות',
      selector: (row: any) => row.note,
      sortable: true,
    },

  ]

  const logged_user_detail: any = localStorage.getItem('logged_user_detail');
  const loggedInUserDetails = JSON.parse(logged_user_detail);

  const baseUrl = process.env.REACT_APP_API_URL;
  const endPoints ={
    'ButtonAttendanceStart':'/api/Inner/AttendanceDailySaveAttendanceEntrance',
    'ButtonAbsenceStart':'/api/Inner/AttendanceDailySaveAbsenceEntrance',
    'ButtonSickStart':'/api/Inner/AttendanceDailySaveSickEntrance',
    'exitAnyEntranceAPI':'/api/Inner/AttendanceDailySaveAnyExit',
    "ButtonFullSickDay":"/api/Inner/AttendanceDailyFullSickDay",
    "ButtonFullAbsenceDay":"/api/Inner/AttendanceDailyFullAbsenceDay"
  }
  const getDailyAttendanceEndpoint = `${baseUrl}/api/Inner/GetAttendanceDaily`;
  const saveStartShiftEndpoint = `${baseUrl}/api/Inner/SaveStartShift`;
  const saveEndShiftEndpoint = `${baseUrl}/api/Inner/SaveEndShift`;
  const getDataEntPoint = `${baseUrl}/api/Inner/GetData`;
  const headerJson = {
    headers: {
      Authorization: `bearer ${loggedInUserDetails.access_token}`
    }
  }

  useEffect(() => {
    getDailyAttendance();
    setUserFirstName(localStorage.getItem('logged_in_user_firstName')|| '');
    getDataApi();

    if(!(localStorage.getItem('absenceTypes') || localStorage.getItem('buttonHebrewTexts'))){
      getDataApi();
    }else{
      let bHebewTexts=JSON.parse(localStorage.getItem('buttonHebrewTexts')|| '');
      let abTypes=JSON.parse(localStorage.getItem('absenceTypes')|| '');
      setHebrewButtonsText(bHebewTexts)
      setAbsenceTypeItems(abTypes);
      setActiveAbsenceType(abTypes[0].id)

    }
  }, []);
  const setHebrewButtonsText =(data:any[])=>{
    let buttonsHebrew:any ={}
    data.forEach(({id,name})=>{
      buttonsHebrew[id]=name;
    })
    setHebrewButtons(buttonsHebrew);
}

  const getSelectedTabData =(activeTab:string) =>{
    switch (activeTab){
      case 'attendance' :
        return  constructAttandancePageContent();
      case 'absence':
        return constructAbsencePageContent();
      case 'sick':
        return constructSickNessPageContent();
    }
  }

  const handleAPIForAttendance =async (endPoint:string,dataToSend:any) =>{
    //axios request
    const response = await axios.post(`${baseUrl}${endPoint}`, dataToSend, headerJson);
    if(response && response.data){
      const {data}=response;
      if(data.result===false){
        return alert(data.message)
      }
      getDailyAttendance();
    }


  }

  const setStartTimeStatus = (time: any) => {
    setStartDisabled(time != null);
    setStartTime(time)
  }

  const setEndTimeStatus = (time: any) => {
    setEndDisabled(time != null);
    setEndTime(time)
  }
  const constructSickNessPageContent = () => {
    return <>
      <div>
        <input type='text' className='form-control mt-7' placeholder='הערה' value={note} onChange={e=>setNote(e.target.value)} />
        <div className="button-parent-div">
          <button
            
            disabled={!buttonActions.allowSickAllDay}
            type='submit'
            id='exit_time_button'
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.ButtonFullSickDay;
              let data={
                workActivityNote:note,
                date:todaysDate
              }
              handleAPIForAttendance(endPoint,data);
            }}
            className='btn btn-lg btn-secondary w-170-px mb-5 ml-xl-100'>
            {hebrewButtons.ButtonSickAllDay}
          </button>

          <button
            
            type='submit'
            id='exit_time_button'
            disabled={!buttonActions.allowSickStart}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.ButtonSickStart;
              let data={
                workActivityNote:note,
                date:todaysDate
              }
              handleAPIForAttendance(endPoint,data);
            }}
            className='btn btn-lg btn-secondary w-170-px mb-5 ml-xl-100'>
              {activeRow==='sick' && latestStartTime!==null ? latestStartTime : hebrewButtons.ButtonSickStart }
            {/* {hebrewButtons.ButtonSickStart} */}
          </button>
          <button
            
            type='submit'
            id='exit_time_button'
            disabled={!buttonActions.allowSickEnd}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.exitAnyEntranceAPI;
              let data={
                date:todaysDate
              }
              handleAPIForAttendance(endPoint,data);
            }}
            className='btn btn-lg btn-secondary w-170-px mb-5 ml-xl-100'>
            {hebrewButtons.ButtonSickEnd}
          </button>
        </div>

      </div>
    </>
  }

  const constructAttandancePageContent = () => {
    return <>
      <div>
        {
          workActivityCodeItems && workActivityCodeItems.length && <select
            aria-label=''
            data-control='select2'
            data-placeholder='Work Activity Code'
            className='form-select form-select-sm form-select-solid mb7'
            disabled={false}
            value={selectedOption}
            onChange={handleChange}
          >
            {
              workActivityCodeItems.map(({ id, name }) => <option value={id}>{`${name}`}</option>)
            }
          </select>
        }
        <input type='text' className='form-control mt-7' placeholder='הערה' value={note} onChange={e=>setNote(e.target.value)} />
        <div className="button-parent-div">
         
          <button
            
            type='submit'
            id='exit_time_button'
            disabled={!buttonActions.allowAttendanceStart}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.ButtonAttendanceStart;
              let data={
                workActivityCode:selectedOption,
                workActivityNote:note,
                date:todaysDate
              }
              handleAPIForAttendance(endPoint,data);
            }}
            className='btn btn-lg btn-secondary w-170-px mb-5 ml-xl-100'>
              {activeRow==='attendance' && latestStartTime!==null ? latestStartTime : hebrewButtons.ButtonAttendanceStart }
          </button>

          <button
            
            disabled={!buttonActions.allowAttendanceEnd}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.exitAnyEntranceAPI;
              let data={
              }
              handleAPIForAttendance(endPoint,data);
            }}
            type='submit'
            id='exit_time_button'
            className='btn btn-lg btn-secondary w-170-px mb-5 ml-xl-100'>
            {hebrewButtons.ButtonAttendanceEnd}
          </button>

         
        </div>

      </div>
    </>
  }
  
  const constructAbsencePageContent = () => {
    return <>
      <div>
        {
          absenceTypeItems && absenceTypeItems.length && <select
            aria-label=''
            data-control='select2'
            data-placeholder='Work Activity Code'
            className='form-select form-select-sm form-select-solid mb-7'
            disabled={false}
            value={activeAbsenceType}
            onChange={handleChangeAbsenceType}
          >
            {
              absenceTypeItems.map(({ id, name }) => <option value={id}>{`${name}`}</option>)
            }
          </select>
        }
        <input type='text' className='form-control mt-7' placeholder='הערה' value={note} onChange={e=>setNote(e.target.value)} />
        <div className="button-parent-div">
        <button
            
            type='submit'
            id='exit_time_button'
            disabled={!buttonActions.allowAbsenceAllDay}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.ButtonFullAbsenceDay;
              let data={
                absenceCode:activeAbsenceType,
                date:todaysDate
                // workActivityNote:note
              }
              handleAPIForAttendance(endPoint,data);
            }}
            className='btn btn-lg btn-secondary w-170-px mb-5 ml-xl-100'>
            {hebrewButtons.ButtonAbsenceAllDay}
          </button>
          <button
            
            type='submit'
            id='exit_time_button'
            disabled={!buttonActions.allowAbsenceStart}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.ButtonAbsenceStart;
              let data={
                absenceCode:activeAbsenceType,
                date:todaysDate
                // workActivityNote:note
              }
              handleAPIForAttendance(endPoint,data);
            }}
            className='btn btn-lg btn-secondary w-170-px mb-5 ml-xl-100'>
              {activeRow==='absence' && latestStartTime!==null ? latestStartTime : hebrewButtons.ButtonAbsenceStart }
           
            {/* {hebrewButtons.ButtonAbsenceStart} */}
          </button>
          <button
            
            type='submit'
            disabled={!buttonActions.allowAbsenceEnd}
            onClick={e=>{
              e.preventDefault();
              let endPoint=endPoints.exitAnyEntranceAPI;
              let data={
                // absenceCode:activeAbsenceType,
                // workActivityNote:note
              }
              handleAPIForAttendance(endPoint,data);
            }}
            id='exit_time_button'
            className='btn btn-lg btn-secondary w-170-px mb-5 ml-xl-100'>
            {hebrewButtons.ButtonAbsenceEnd}
          </button>

        </div>

      </div>
    </>
  }
  const handleChangeAbsenceType =(e:any) =>{
    setActiveAbsenceType(e.target.value)
  }
  const filterExistingData =(data:any) =>{
      return data?.filter((item:any)=>{
        if(isDataExist(item)){
          return item;
        }
      });


  }
  const isDataExist =(obj:any) =>{
    let exists=false;
    for(let property in obj){
      if(property!=="id"){
        if((obj[property]!==null && obj[property]!=="")){
          exists=true;
        }
      }
     
    }
    return exists;
  }
  const getDailyAttendance = async () => {
    const response = await axios.post(getDailyAttendanceEndpoint, {date:todaysDate}, headerJson)

    if (response && response.data) {
      const { data } = response;
      const { result, message,existingData,absenceCode,workActivityCode, currentDate,currentStatus , latestStartTime,rowType, latestEndTime, workActivityItems,allowAbsenceAllDay,allowAbsenceEnd,allowAbsenceStart,allowAttendanceEnd,allowAttendanceStart,allowSickAllDay,allowSickEnd,allowSickStart } = data;
      setResponseStatus(result);
      setActiveTab(rowType);
   
      setCurrentDate(currentDate);
      if(workActivityCode){
        setSelectedOption(workActivityCode);
      }else{
        setSelectedOption(workActivityItems[0].id)
      }
      if(absenceCode){
        setActiveAbsenceType(absenceCode)
      }
      let exData=filterExistingData(existingData);
      setExistingData(exData|| []);
      setCurrentStatus(currentStatus);
      setButtonActions({
        allowAbsenceAllDay,allowAbsenceEnd,allowAbsenceStart,allowAttendanceEnd,allowAttendanceStart,allowSickAllDay,allowSickEnd,allowSickStart
      })
      if (result) {
        setStartTimeStatus(latestStartTime);
        setLatestStartTime(latestStartTime);
        setActiveRow(rowType);
        setEndTimeStatus(latestEndTime)
        // eslint-disable-next-line no-lone-blocks
        if (workActivityItems && workActivityItems.length) {
          setWorkActivityCodeItems(workActivityItems)
        }
      }
      setResponseMessage(message)
    }
  }
  const getDataApi = async () => {
    const response = await axios.post(getDataEntPoint, {}, headerJson)

    if (response && response.data) {
      const { data } = response;
      const {absenceTypes,buttonHebrewTexts,banks,}=data;
      localStorage.setItem('absenceTypes',JSON.stringify(absenceTypes));
      localStorage.setItem('buttonHebrewTexts',JSON.stringify(buttonHebrewTexts));
      setAbsenceTypeItems(absenceTypes);
      setActiveAbsenceType(absenceTypes[0].id)
      setHebrewButtonsText(buttonHebrewTexts);      
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

  const handleChange =  (event: any) => {
    setSelectedOption(event.target.value);
  }
  const handleChangeTab  = (id:any) => (event: any)=>{
    setActiveTab(id);
  }
const getSelectedClass =(id:any)=>{
  if(id==activeTab){
    return `active-tab`
  }else{
    return `general-tab`
  }
}
  return <>
    <div style={{height:'auto'}} className='main-container-dashboard'>
      <ul style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer"}} className="nav nav-tabs nav-tabs-line mb-7">
      {tabs.length && tabs.map(({name,id,label})=>{
        // ${name.charAt(0).toUpperCase()+name.slice(1)}
          return (

            <li key={id} className="nav-item" onClick={handleChangeTab(name)}>
               <span className={`nav-link tab ${getSelectedClass(name)} ` }  data-toggle="tab" >{`${label}`}</span>
            </li>
    
          )
      })}
      </ul>
      <div style={{textAlign:'center',fontWeight:'bold',marginBottom:'30px'}}>
        {/* <p>Here is your Status</p> */}
        <p>{`שלום ${userFirstName}`}</p>
        <p>{`נוכחות יומית : ${currentDate}`}</p>
        <p>{`סטטוס נוכחי : ${currentStatus}`}</p>
      </div>
      {getSelectedTabData(activeTab)}
      {/* {
        existingData.length > 0 ?
          <DataTable data={existingData} columns={tableColumns} striped theme="solarized" />
          : ""
      } */}
      {/* Table Custom */}


      {
        existingData.length > 0 ?
       <ShowDataTable  className='mb-5 mb-xl-8 xl-10' listData={existingData} />
          : ''

      }

      {/* Table Custom End */}
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
 {/* <button
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
          </button> */}

          // <button
          //   
          //   // onClick={() => {
          //   //   if (selectedOption && startTime != null) {
          //   //     saveEndShiftTiming()
          //   //   } else {
          //   //     setResponseMessage('חובה לבחור ערך בשדה פעילות');
          //   //   }
          //   // }}
          //   // disabled={isEndDisabled}
          //   type='submit'
          //   id='exit_time_button'
          //   className='btn btn-lg btn-secondary w-170-px mb-5'>
          //   {/* {isEndDisabled ? endTime : `יציאה`} */}
          //   {hebrewButtons.ButtonAbsenceStart}
          // </button>