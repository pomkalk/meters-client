const zero = (d) => {
    return ('0'+d).slice(-2)
}

export const ParseDate = (dateString) => {
    let d = new Date(dateString)
    return `${zero(d.getDate())}.${zero(d.getMonth()+1)}.${d.getFullYear()} ${zero(d.getHours())}:${zero(d.getMinutes())}:${zero(d.getSeconds())}`
}

export const ParseDate2 = (dateString) => {
    let d = new Date(dateString)
    return `${zero(d.getDate())}.${zero(d.getMonth()+1)}.${d.getFullYear()}`
}