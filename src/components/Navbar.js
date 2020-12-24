import React from 'react'
import Logo from './Logo'
import { Button, Space, Row, Col, PageHeader } from 'antd'

const Navbar = () => {
    return (<div className="navbar">
        <PageHeader className="site-page-header" title="Ввод показаний счетчиков" extra={[
            <Button>asd</Button>
        ]}/>
    </div>)
}

export default Navbar
