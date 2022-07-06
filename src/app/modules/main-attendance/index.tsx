import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MainAttendance = () => {
    const [data,setData] = useState([{},{},{},{},{},{}])

    const logged_user_detail: any = localStorage.getItem('logged_user_detail');
    const loggedInUserDetails = JSON.parse(logged_user_detail);
  
    const baseUrl = process.env.REACT_APP_API_URL;
    const getAttendanceSummaryEndpoint = `${baseUrl}/api/Inner/GetAttendanceSummary`;

    useEffect(() => {
        getAttendanceSummary()
    },[])

    const getAttendanceSummary = async() => {
        const response = await axios.post(getAttendanceSummaryEndpoint, 
          {
            headers: {
              Authorization: `bearer ${loggedInUserDetails.access_token}`
            }
          })
  
        if(response && response.data.result){
          const {data} = response;
          const {result, message} = data;
        }
    }

    return(
        <>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div style={{}}>
                    Vacation Data
                    {data.map(() => {
                        return <AttendaneDetailItem />
                    })
                    }
                </div>
                <div>
                    Sick Days Data
                    {data.map(() => {
                        return <AttendaneDetailItem />
                    })
                    }
                </div>
                <div>
                    Setting Data
                    {data.map(() => {
                        return <AttendaneDetailItem />
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default MainAttendance;


const AttendaneDetailItem = () => {

    return(
        <>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <p style={{padding: '0px 10px', background: '#ffffff'}}>1234</p>
                <p style={{marginLeft: '5px'}}>item name</p>
            </div>
        </>
    )
}