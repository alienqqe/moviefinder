export const MovieHeader = ({ heading, icon }) => {
  return (
    <div className='col'>
      <h1>
        {heading}
        {icon}
      </h1>
    </div>
  )
}
