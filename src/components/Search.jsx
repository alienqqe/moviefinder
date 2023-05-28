export const Search = ({ value, setValue }) => {
  const valueHandle = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className='col col-sm-4 '>
      <input
        type='text'
        className='form-control'
        placeholder='Find movie'
        value={value}
        onChange={valueHandle}
      />
    </div>
  )
}
