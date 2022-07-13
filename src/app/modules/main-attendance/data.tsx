
export const colors = {
    red: '#ff0000',
    green: '#00FF00',
    plain: '#808080'
}

export const parentKeys = {
    settingsData: `settingsData`,
    vacationData: `vacationData`,
    sickDaysData: `sickDaysData`,
    timeData: `timeData`,
    supplementData: `supplementData`,
    summaryData: `summaryData`
}

export const listData = [
    // === Settings Data === //
    {
        keyYearOne: 'volunteerStatus',
        keyYearTwo: 'volunteerStatus',
        parentKey: parentKeys.settingsData,
        label: 'סטטוס מתנדב',
        color: colors.plain,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: null,
        yearTwoValue: null
    },
    {
        keyYearOne: 'startSettingDate1',
        keyYearTwo: 'startSettingDate2',
        parentKey: parentKeys.settingsData,
        label: 'תאריך תחילת שירות',
        color: colors.plain,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: null,
        yearTwoValue: null
    },
    {
        keyYearOne: 'SettingDays1',
        keyYearTwo: 'SettingDays2',
        parentKey: parentKeys.settingsData,
        label: 'ימי שיבוץ',
        color: colors.plain,
        isEditable: false,
        listNo: 3,
        type: 4,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'settingInOtherNPO1',
        keyYearTwo: 'settingInOtherNPO2',
        parentKey: parentKeys.settingsData,
        label: 'שיבוץ בעמותה אחרת',
        color: colors.plain,
        isEditable: false,
        listNo: 3,
        type: 5,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'settedDays1',
        keyYearTwo: 'settedDays2',
        parentKey: parentKeys.settingsData,
        label: 'סה”כ ימי שיבוץ',
        color: colors.plain,
        isEditable: false,
        listNo: 3,
        type: 6,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'missingDays1',
        keyYearTwo: 'missingDays2',
        parentKey: parentKeys.settingsData,
        label: 'מחסור בימי שיבוץ',
        color: colors.plain,
        isEditable: false,
        listNo: 3,
        type: 4,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'continuityHoleDays1',
        keyYearTwo: 'continuityHoleDays2',
        parentKey: parentKeys.settingsData,
        label: 'בעיית רציפות',
        color: colors.plain,
        isEditable: false,
        listNo: 3,
        type: 8,
        yearOneValue: '',
        yearTwoValue: ''
    },

    // === Vacation Data === //
    {
        keyYearOne: 'allowedVacDays1',
        keyYearTwo: 'allowedVacDays2',
        parentKey: parentKeys.vacationData,
        label: 'ימי חופשה ע”פ חוזה',
        color: colors.green,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'onVolVacationDays1',
        keyYearTwo: 'onVolVacationDays2',
        parentKey: parentKeys.vacationData,
        label: 'ימי חופשה מנוצלים ע”ח הבת',
        color: colors.red,
        isEditable: false,
        listNo: 5,
        type: 1,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'missingDaysForCorona1',
        keyYearTwo: 'missingDaysForCorona2',
        parentKey: parentKeys.vacationData,
        label: 'ניצול ימי חופש עקב קורונה',
        color: colors.red,
        isEditable: false,
        listNo: 9,
        type: 1,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'onSysVacationDays1',
        keyYearTwo: 'onSysVacationDays2',
        parentKey: parentKeys.vacationData,
        label: 'ימי חופשה ע”ח מערכת',
        color: colors.plain,
        isEditable: false,
        listNo: 1,
        type: 4,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'extraVacationDays1',
        keyYearTwo: 'extraVacationDays2',
        parentKey: parentKeys.vacationData,
        label: 'ימי חופשה ע”ח ימי הכשרות',
        color: colors.green,
        isEditable: false,
        listNo: 4,
        type: 3,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'additionalDays1',
        keyYearTwo: 'additionalDays2',
        parentKey: parentKeys.vacationData,
        label: 'ימי נוספים',
        color: colors.green,
        isEditable: false,
        listNo: 4,
        type: 1,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'leftVacationDays1',
        keyYearTwo: 'leftVacationDays2',
        parentKey: parentKeys.vacationData,
        label: 'סה”כ חופשות שנותרו לניצול',
        color: colors.plain,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: '',
        yearTwoValue: ''
    },
   
    // === Sick Days Data === //
    {
        keyYearOne: 'allowedSickDays1',
        keyYearTwo: 'allowedSickDays2',
        parentKey: parentKeys.sickDaysData,
        label: 'ימי מחלה ע”פ חוזה',
        color: colors.plain,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: '',
        yearTwoValue: ''
    },

    {
        keyYearOne: 'allSickDays1',
        keyYearTwo: 'allSickDays2',
        parentKey: parentKeys.sickDaysData,
        label: 'ימי מחלה כללי',
        color: colors.plain,
        isEditable: false,
        listNo: 2,
        type: 5,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'notAppSickDays1',
        keyYearTwo: 'notAppSickDays2',
        parentKey: parentKeys.sickDaysData,
        label: 'ימי מחלה לא מאושרים',
        color: colors.red,
        isEditable: false,
        listNo: 2,
        type: 1,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'appSickDays1',
        keyYearTwo: 'appSickDays2',
        parentKey: parentKeys.sickDaysData,
        label: 'ימי מחלה מאושרים',
        color: colors.plain,
        isEditable: false,
        listNo: 1,
        type: 1,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'appQuarantineSickDays1',
        keyYearTwo: 'appQuarantineSickDays2',
        parentKey: parentKeys.sickDaysData,
        label: 'ימי מחלה מאושרים בידוד',
        color: colors.plain,
        isEditable: false,
        listNo: 2,
        type: 4,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'aboveSickDays1',
        keyYearTwo: 'aboveSickDays2',
        parentKey: parentKeys.sickDaysData,
        label: 'ימי מחלה מעבר למכסה',
        color: colors.red,
        isEditable: false,
        listNo: 1,
        type: 2,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'medicalDays1',
        keyYearTwo: 'medicalDays2',
        parentKey: parentKeys.sickDaysData,
        label: 'ועדה רפואית',
        color: colors.plain,
        isEditable: false,
        listNo: 6,
        type: 1,
        yearOneValue: '',
        yearTwoValue: ''
    },
    {
        keyYearOne: 'leftMedicalDays1',
        keyYearTwo: 'leftMedicalDays2',
        parentKey: parentKeys.sickDaysData,
        label: 'ימים מאושרים מועדה',
        color: colors.plain,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: '',
        yearTwoValue: ''
    },

    // === Time Data === //
    {
        keyYearOne: 'hoursMissing1',
        keyYearTwo: 'hoursMissing2',
        parentKey: parentKeys.timeData,
        label: 'מחסור בשעות',
        color: colors.plain,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: null,
        yearTwoValue: null
    },
    {
        keyYearOne: 'systemExtraDaysForHours1',
        keyYearTwo: 'systemExtraDaysForHours2',
        parentKey: parentKeys.timeData,
        label: 'חוסר ימים ע”ח שעות',
        color: colors.plain,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: null,
        yearTwoValue: null
    },

    // === Supplementary Data === //
    {
        keyYearOne: 'completionPotentialDays1',
        keyYearTwo: 'completionPotentialDays2',
        parentKey: parentKeys.supplementData,
        label: 'ימי השלמה פוטנציאלים',
        color: colors.plain,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: null,
        yearTwoValue: null
    },
    {
        keyYearOne: 'completionNotAppSickDays1',
        keyYearTwo: 'completionNotAppSickDays2',
        parentKey: parentKeys.supplementData,
        label: 'ימי מחלה בהשלמה לא מאושרים',
        color: colors.plain,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: null,
        yearTwoValue: null
    },
    {
        keyYearOne: 'completionTotalDays1',
        keyYearTwo: 'completionTotalDays2',
        parentKey: parentKeys.supplementData,
        label: 'ימי עבודה בהשלמה',
        color: colors.green,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: null,
        yearTwoValue: null
    },

    // === Summary Data === //
    {
        keyYearOne: 'totalAddionalDays1',
        keyYearTwo: 'totalAddionalDays2',
        parentKey: parentKeys.summaryData,
        label: 'סה”כ זכות',
        color: colors.green,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: null,
        yearTwoValue: null
    },
    {
        keyYearOne: 'totalBrutoDebt1',
        keyYearTwo: 'totalBrutoDebt2',
        parentKey: parentKeys.summaryData,
        label: 'סה”כ חובות',
        color: colors.red,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: null,
        yearTwoValue: null
    },
    {
        keyYearOne: 'total2DoDays1',
        keyYearTwo: 'total2DoDays2',
        parentKey: parentKeys.summaryData,
        label: 'סה”כ נותר',
        color: colors.plain,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: null,
        yearTwoValue: null
    },
    {
        keyYearOne: 'totalDaysLeft',
        keyYearTwo: 'totalDaysLeft',
        parentKey: parentKeys.summaryData,
        label: 'סיכום שירות',
        color: colors.plain,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: null,
        yearTwoValue: null
    },
    {
        keyYearOne: 'missingReports1',
        keyYearTwo: 'missingReports2',
        parentKey: parentKeys.summaryData,
        label: 'מחסור בטפסים',
        color: colors.plain,
        isEditable: false,
        listNo: 0,
        type: 0,
        yearOneValue: null,
        yearTwoValue: null
    },
]