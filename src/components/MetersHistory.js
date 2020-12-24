import React from 'react'
import { Spin, Table } from 'antd'
import { ParseDate2 } from '../ParseDate'

const MetersHistory = ({data}) => {
    if (!data) {
        return ''
    }

    if (data.loading) {
        return <Spin />
    }

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

    const columns = [
        {
            title: 'Месяц',
            key: 'period',
            render: (text, rec) => {
                return `${getMonthName(rec.month)} ${rec.year}`
            }
        },
        {
            title: 'Дата последних показаний',
            key: 'last_date',
            render: (text, rec) => {
                return `${getMonthName(rec.last_month)} ${rec.last_year}`
            }
        },
        {
            title: 'Последние показание',
            dataIndex: 'last_value'
        },
        {
            title: 'Показания',
            dataIndex: 'new_value'
        },
        {
            title: 'Дата',
            dataIndex: 'new_date',
            render: (text) => {
                if (text) {
                    return ParseDate2(text)
                }
                return text
            }
        }
    ]

    return <Table pagination={false} size="small" dataSource={data.meters} title={()=>data.address} columns={columns} rowKey="id" />
}

export default MetersHistory
