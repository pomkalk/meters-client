import React from 'react'
import { Space, Spin, Table } from 'antd'
import { ParseDate2 } from '../ParseDate'

const MetersHistoryMobile = ({data}) => {
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

    const title = (<Space direction="vertical" >
        <span>Месяц</span>
        <span>Дата последних показаний</span>
        <span>Последние показание</span>
        <span>Показания</span>
        <span>Дата</span>
    </Space>)

    const columns = [
        {
            title: '',
            key: 'period',
            render: (text, rec) => {
                let date = rec.new_date
                if (date) {
                    date = ParseDate2(date)
                }
                return (<Space direction="vertical">
                    <span>Месяц: {getMonthName(rec.month)} {rec.year}</span>
                    <span>Дата последних показаний: {getMonthName(rec.last_month)} {rec.last_year}</span>
                    <span>Последние показанее: {rec.last_value}</span>
                    <span>Показания: {rec.new_value}</span>
                    <span>Дата: {date}</span>
                </Space>)
            }
        }
    ]

    return <Table pagination={false} size="small" dataSource={data.meters} title={()=>data.address} columns={columns} rowKey="id" />
}

export default MetersHistoryMobile
