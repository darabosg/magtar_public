const alpabetSort = (array) => {
return array.slice().sort((a, b) => b==='CUSTOM'?1:a==='CUSTOM' ? -1:a.localeCompare(b))
}

export default alpabetSort