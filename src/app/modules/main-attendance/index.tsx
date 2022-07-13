import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { colors, listData, parentKeys } from './data'

const SectionDataView = (props: any) => {
    const { data, hasSecondYear, sectionTitle, parentKey } = props;
    return (
        <div style={{ flex: 1, margin: '5px' }}>
            <ListHeaderSection headerTitle={`${sectionTitle}`} />
            {data.map((item: any) => {
                if (item.parentKey === parentKey && item.yearOneValue != null && item.yearTwoValue != null) {
                    return <AttendaneDetailItem
                        item={item}
                        hasSecondYear={hasSecondYear} />
                }
            })
            }
        </div>
    )
}

const ListHeaderSection = (props: any) => {
    const { headerTitle } = props;
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>{`Year 2`}</p>
                <p style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>{`Year 1`}</p>
                <p style={{ textAlign: 'center', flex: 3, fontWeight: 'bold' }}>{headerTitle}</p>
            </div>
        </>
    )
}

const AttendaneDetailItem = (props: any) => {
    const { item, hasSecondYear } = props
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
                {hasSecondYear && <div style={{ flex: 1 }} >
                    <p style={{ padding: '0px 5px', margin: '0px 3px', background: '#ffffff', height: '20px', border: '1px solid #000', textAlign: 'center' }}>{`${item[`yearTwoValue`] || ''}`}</p>
                </div>
                }
                <div style={{ flex: 1 }}>
                    <p style={{ padding: '0px 5px', margin: '0px 3px', background: '#ffffff', height: '20px', border: '1px solid #000', textAlign: 'center' }}>{`${item[`yearOneValue`] || ''}`}</p>
                </div>
                <p style={{ marginLeft: '5px', color: item.color, flex: 3, textAlign: 'right' }}>{`${item.keyYearOne}`}</p>
            </div>
        </>
    )
}

const MainAttendance = () => {
    const [data, setData] = useState(listData);
    const [hasSecondYear, setHasSecondYear] = useState(false);

    const logged_user_detail: any = localStorage.getItem('logged_user_detail');
    const loggedInUserDetails = JSON.parse(logged_user_detail);

    const baseUrl = process.env.REACT_APP_API_URL;
    const getAttendanceSummaryEndpoint = `${baseUrl}/api/Inner/GetAttendanceSummary`;
    const getAttendanceShowListEndpoint = `${baseUrl}/api/Inner/GetAttendanceShowList`;
    const authHeader = {
        headers: {
            Authorization: `bearer ${loggedInUserDetails.access_token}`
        }
    }

    useEffect(() => {
        getAttendanceSummary()
    }, [])

    const getAttendanceSummary = async () => {
        const response = await axios.post(getAttendanceSummaryEndpoint, {},
            authHeader)

        if (response && response.data.result) {
            const { data } = response;
            const { result, message, isHasSecondYear } = data;
            setHasSecondYear(isHasSecondYear);
            renderDataWithFields(data);
        }
    }

    const getAttendanceShowList = async (list: any, type: any, year: any) => {
        const response = await axios.post(getAttendanceShowListEndpoint, {
            list,
            type,
            year,
            sortBy: 'code',
            sortOrder: 'asc',
            page: 1,
            rows: 15

        }, authHeader)

        if (response && response.data.result) {
            const { data } = response;
            const { result, message } = data;
        }
    }

    const renderDataWithFields = (data: any) => {
        Object.keys(data).forEach((item) => {
            if (!['result', 'message'].includes(item)) {
                listData.forEach((temp) => {
                    if (temp.keyYearOne === item) {
                        temp.yearOneValue = data[`${item}`]
                    }
                    if (temp.keyYearTwo === item) {
                        temp.yearTwoValue = data[`${item}`]
                    }
                })
                setData(listData);
            }
        })
    }

    const

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <SectionDataView
                    parentKey={parentKeys.settingsData}
                    sectionTitle={`נתוני שיבוץ`}
                />
                <SectionDataView
                    parentKey={parentKeys.vacationData}
                    sectionTitle={`נתוני חופשה`}
                />
                <SectionDataView
                    parentKey={parentKeys.sickDaysData}
                    sectionTitle={`נתוני ימי מחלה`}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <SectionDataView
                    parentKey={parentKeys.timeData}
                    sectionTitle={`נתוני שעות`}
                />
                <SectionDataView
                    parentKey={parentKeys.supplementData}
                    sectionTitle={`נתוני השלמות`}
                />
                <SectionDataView
                    parentKey={parentKeys.summaryData}
                    sectionTitle={`סיכום`}
                />
            </div>
        </>
    )
}

export default MainAttendance;