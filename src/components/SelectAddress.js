import React from 'react'
import { Form, Button, Card, Checkbox, Select, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getBuildings, getApartments, getOpen } from '../store'


const SelectAddress = ({showSave}) => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    const streets = useSelector(state=>state.streets)
    const buildings = useSelector(state=>state.buildings)
    const apartments = useSelector(state=>state.apartments)
    const pending = useSelector(state=>state.pending)

    const onStreetChange = (value) => {
        form.setFieldsValue({ building: null, apartment: null})
        dispatch(getBuildings(value))
    }

    const onBuildingChange = (value) => {
        dispatch(getApartments(value))
    }

    const onSubmit = (values) => {
        dispatch(getOpen(values))
    }

    const validateMassages = {
        required: 'Поле "${label}" не указано.'
    }

    return (<div className="box">
                <Card title="Заполните данные" size="small">
                    
                        <Form layout="vertical" form={form} onFinish={onSubmit} validateMessages={validateMassages}>
                            {/* <Form.Item>
                            <Typography.Title level={5}>Заполните данные.</Typography.Title>
                            </Form.Item> */}
                            <Form.Item label="Улица" name="street" rules={[{ required: true}]}>
                                <Select loading={streets.loading} disabled={streets.loading} onChange={onStreetChange} showSearch style={{width: '100%'}} placeholder="Укажите улицу" optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())>=0}>
                                    {streets.data && streets.data.map(x=> {
                                    return <Select.Option key={x.id} value={x.id}>{`${x.type}. ${x.name}`}</Select.Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Дом" name="building" rules={[{ required: true}]}>
                                <Select loading={buildings.loading} disabled={buildings.data?false:true} onChange={onBuildingChange} showSearch style={{width: '100%'}} placeholder="Укажите дом" optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())>=0}>
                                    {buildings.data && buildings.data.map(x=> {
                                    return <Select.Option key={x.id} value={x.id}>{`${x.number}${x.housing.length>0?'/'+x.housing:''}`}</Select.Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Квартира" name="apartment" rules={[{ required: true}]}>
                                <Select loading={apartments.loading} disabled={apartments.data?false:true} showSearch style={{width: '100%'}} placeholder="Укажите квартиру" optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())>=0}>
                                    {apartments.data && apartments.data.map(x=> {
                                    return <Select.Option key={x.id} value={x.id}>{`${x.number}${x.part.length>0?'/'+x.part:''}`}</Select.Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Лицевой счет (6 цифр)" name="ls" rules={[{ required: true}, {len: 6}]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                            <Form.Item label="Площадь помещения" name="space" rules={[{ required: true}]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                            <Form.Item name="remember" valuePropName="checked" initialValue={false} hidden={showSave}>
                                <Checkbox>Сохранить адрес (Максимум 5)</Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Button loading={pending} style={{width: '100%'}} type="primary" htmlType="submit">
                                Найти адрес
                                </Button>
                            </Form.Item>
                        </Form>
                    
                </Card>
            </div>)
}

export default SelectAddress
