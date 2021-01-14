import React from 'react'
import { Button, Typography, Space, Alert, Card, ConfigProvider } from 'antd'
import { QuestionCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import SelectAddress from './components/SelectAddress'
import SavedAddresses from './components/SavedAddresses'
import { useSelector } from 'react-redux'
import Sizer from './components/Sizer'
import ru from 'antd/lib/locale/ru_RU'

const App = () => {
    const { access, saved, edit } = useSelector(state=>({access: state.access, saved: state.saved, edit: state.edit }))
    let page

    if (edit) {

        page = <Sizer data={edit} />
    } else {
        page = (<>{access&&<div className="box" style={{paddingBottom: '12px'}}><Alert showIcon type="info" message="Внимание" description={access} /></div>}
        { saved && <SavedAddresses saved={saved} />}
        <SelectAddress showSave={ (saved||[]).length>=5 ? true : false }/></>)
    }

    return (<><ConfigProvider locale={ru}>
        <div className="navbar">
            <div className="header-container">
                <Typography.Text strong>Ввод показаний счетчиков ООО "УЕЗ ЖКУ г. Ленинска-Кузнецкого"</Typography.Text>
            </div>
        </div>
        <div className="page">
            <div className="buttons">
                <Space>
                    {/* <Button icon={<QuestionCircleOutlined />}>Справка</Button> */}
                    <Button href="http://uez-lk.ru" icon={<ArrowLeftOutlined />}>Вернуться на сайт</Button>
                </Space>
            </div>
            { page }            
        </div>
        <div className="footer">
            <a href="http://uez-lk.ru">ООО «УЕЗ ЖКУ г. Ленинска-Кузнецкого» 2015 ©</a>
        </div>
        </ConfigProvider>
    </>)
}

export default App
