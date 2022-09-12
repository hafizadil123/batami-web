import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Documents = () => {
    const [listData, setListData] = useState([]);

    const logged_user_detail: any = localStorage.getItem('logged_user_detail');
    const loggedInUserDetails = JSON.parse(logged_user_detail);

    const baseUrl = process.env.REACT_APP_API_URL;
    const getDocumentListEndpoint = `${baseUrl}/api/Inner/GetDocumentList`;
    const showDocumentEndpoint = `${baseUrl}/api/Inner/ShowDocument`;
    const authHeader = {
        headers: {
            Authorization: `bearer ${loggedInUserDetails.access_token}`
        }
    }

    useEffect(() => {
       // fetchDocumentList();
    }, [])

    const fetchDocumentList = async () => {
        const response = await axios.post(getDocumentListEndpoint, {},
            authHeader)

        if (response && response.data) {
            const { result, rows } = response.data
            if (result) {
                setListData(rows);
                console.log('Data : ', response);
            }
        }
    }

    const HeaderTitleView = (props: any) => {
        const { headerTitle, flexValue } = props;
        return (
            <th style={{ flex: flexValue, textAlign: 'center', padding: '5px 0px', color: '#ffffff' }}>{headerTitle}</th>
        )
    }

    const DataView = (props: any) => {
        const { dataText, flexValue, isCheckbox } = props;
        return (
            <>
                {
                    isCheckbox ?
                        <td style={{ flex: flexValue, textAlign: 'center', padding: '5px 0px' }}> <input
                            type='checkbox'
                            checked={dataText}
                            disabled
                        /></td>
                        : <td style={{ flex: flexValue, textAlign: 'center', padding: '5px 0px' }}>{dataText}</td>
                }
            </>
        )
    }

    return (
        <>
            <p></p>
            <table style={{ width: '100%', height: 'auto' }}>
                <thead>
                    <tr style={{ background: '#28b6e5', padding: '330px 50px' }}>
                        <HeaderTitleView headerTitle={`DocType`} flexValue={1} />
                        <HeaderTitleView headerTitle={`Description`} flexValue={3} />
                        <HeaderTitleView headerTitle={`Link`} flexValue={1} />
                        <HeaderTitleView headerTitle={`IsApproved`} flexValue={1} />
                        <HeaderTitleView headerTitle={`IsDeclined`} flexValue={1} />
                        <HeaderTitleView headerTitle={`Uploaded`} flexValue={1} />
                        <HeaderTitleView headerTitle={`ActionDate`} flexValue={1} />
                    </tr>
                </thead>
                <tbody>
                    {
                        listData.length && listData.map((item) => {
                            const { docType, description, hasLink, code, isApproved, isDeclined, uploaded, actionDate } = item
                            return (
                                <tr>
                                    <DataView dataText={docType || ''} flexValue={1} />
                                    <DataView dataText={description || ''} flexValue={3} />
                                    <DataView dataText={hasLink ? <Link style={{cursor:'pointer'}} to={`${showDocumentEndpoint}/${code}`} >{code}</Link> : ''} flexValue={1} />
                                    <DataView dataText={isApproved || ''} flexValue={1} isCheckbox />
                                    <DataView dataText={isDeclined || ''} flexValue={1} isCheckbox />
                                    <DataView dataText={uploaded || ''} flexValue={1} />
                                    <DataView dataText={actionDate || ''} flexValue={1} />
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </>
    )
}

export default Documents