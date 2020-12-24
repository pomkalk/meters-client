import React from 'react'
import { useDispatch } from 'react-redux'
import { getMeters, removeSaved } from '../store'
import { Card, List, Modal } from 'antd'

const SavedAddresses = ({saved }) => {
    const dispatch = useDispatch()

    const onDelete = (address) => {
        Modal.confirm({
            title: 'Удалить данный адрес?',
            content: `Удалить ${address}`,
            onOk: () => {
                dispatch(removeSaved(address))
            }
        })
    }

    return (<div className="box" style={{paddingBottom: '12px'}}>
        <Card title="Сохраненные" size="small">
            <List size="small" dataSource={saved} renderItem={item => {
                return <List.Item actions={[<a onClick={() => onDelete(item.address)}>Удалить</a>]}><a onClick={() => dispatch(getMeters(item.token))}>{item.address}</a></List.Item>
            }} />
        </Card>
    </div> )
}

export default SavedAddresses
