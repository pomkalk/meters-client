import React, { useEffect, useState } from 'react'
import Editor from './Editor'
import EditorMobile from './EditorMobile'


const Sizer = ({ data }) => {
    const [size, setSize] = useState(0)

    const onResize = () => {
        setSize(window.innerWidth)
    }

    useEffect(()=>{
        setSize(window.innerWidth)
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    })

    if (size>650) {
        return <Editor data={data} />
    }

    return <EditorMobile data={data} />
}

export default Sizer
