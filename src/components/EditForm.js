import React from 'react'
import { Form, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { getMeters } from '../store'

const EditForm = ({data}) => {
    const dispatch = useDispatch()
    
    const getMonthName = (code) => {
        switch (code) {
            case 1: return 'Январь'
            case 2: return 'Февраль'
            case 3: return 'Март'
            case 4: return 'Апрель'
            case 5: return 'Май'
            case 6: return 'Июнь'
            case 7: return 'Июль'
            case 8: return 'Август'
            case 9: return 'Сентябрь'
            case 10: return 'Октябрь'
            case 11: return 'Ноябрь'
            case 12: return 'Декабрь'
            default: return code
        }
    }

    return (<>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </>)
}

export default EditForm
