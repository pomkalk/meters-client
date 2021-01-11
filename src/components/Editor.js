import React, { useState, useEffect } from 'react'
import { Alert, Spin, Card, Table, Modal, Button, Form, Space, Input, InputNumber, Popconfirm, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getHistory, setChange, setEdit, setHistory, setMeter, sendFeed } from '../store'
import MetersHistory from './MetersHistory'
import EditForm from './EditForm'

const Confirm = ({value, token, id}) => {
    const dispatch = useDispatch()
    const [v, setV] = useState(value)
    const text = value ? value : 'Передать'

    useEffect(()=>{
        setV(value)
    }, [value])

    const onConfirm = () => {
        dispatch(setMeter(token, id, v))
        setV(value)
    }

    const onCancel = () => {
        setV(value)
    }

    return <Popconfirm icon={null} cancelText="Отмена" okText="Сохранить" onCancel={onCancel} onConfirm={onConfirm} title={<InputNumber style={{width: '100%'}} value={v} onChange={(e)=>setV(e)} />}><a>{text}</a></Popconfirm>
}

const Editor = ({data}) => {
    const dispatch = useDispatch()
    const history = useSelector(state=>state.history)
    const [visible, setVisible] = useState(false)
    const [feedVisible, setFeedVisible] = useState(false)
    const [feedText, setFeedText] = useState('')

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
            title: 'Счетчик',
            dataIndex: 'service',
            render: (text, rec) => {
                switch (rec.service) {
                    case 1: return 'Холодная вода'
                    case 2: return 'Горячая вода'
                    case 3: return 'Электроэнергия'
                    case 4: return 'Отопление'
                    default: return text
                }
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
            dataIndex: 'new_value',
            render: (text, rec) => {
                if (!data.access) {
                    return text
                }
                return <Confirm value={rec.new_value} id={rec.id} token={data.token} />
            }
        },
        {
            title: '',
            key: 'action',
            render: (text, rec) => {
                return <a onClick={()=>{
                    dispatch(getHistory(data.token, rec.id))
                    setVisible(true)
                }}>История</a>
            }
        }
    ]

    const hideHistory = () => {
        setVisible(false)
        dispatch(setHistory(null))
    }


    const hideFeeds = () => {
        setFeedVisible(false)
        setFeedText('')
    }

    const sendFeeds = () => {
        dispatch(sendFeed(data.token, feedText))
        setFeedVisible(false)
        setFeedText('')
    }

    return (<>
        {!data.access&&<div className="box2" style={{paddingBottom: '12px'}}><Alert showIcon type="info" message="Внимание" description={data.message} /></div>}

        <div className="box2">
            <Card title={data.address} size="small" extra={<a onClick={()=>dispatch(setEdit(null))}>Выбрать другой адрес</a>}>
                <Table size="small" pagination={false} dataSource={data.meters} columns={columns} rowKey="id" title={() => `Период: ${getMonthName(data.period.month)} ${data.period.year} г.`}/>
            </Card>
            <Modal width={960} title="История" visible={visible} onCancel={hideHistory} footer={[<Button type="primary" key="ok" onClick={hideHistory}>Ok</Button>]}>
               <MetersHistory data={history} />
            </Modal>
        </div>
        {data.access&&<div style={{paddingTop: '12px'}}><Button onClick={()=>setFeedVisible(true)}>Оставить отзыв</Button>
            <Modal title="Оставить отзыв" visible={feedVisible} onCancel={hideFeeds} onOk={sendFeeds}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography.Title level={5}>
                        Адрес
                    </Typography.Title>
                    <Typography.Text>
                        { data.address }
                    </Typography.Text>
                    <Typography.Title level={5}>
                        Отзыв
                    </Typography.Title>
                    <Input.TextArea style={{alignSelf: 'stretch'}} value={feedText} onChange={e=>setFeedText(e.target.value)} maxLength={1000} showCount={true} />
                </div>
            </Modal>
        </div>}
    </>)
    
}

export default Editor