import React from 'react'
import { Button, PageHeader } from 'antd'

const Navbar = () => {
    return (<div className="navbar">
        <PageHeader className="site-page-header" title="Ввод показаний счетчиков" extra={[
            <Button>asd</Button>
        ]}/>
    </div>)
}

export default Navbar
