import React, {useEffect, useState} from 'react'
import Select from 'react-select';
import './SelectInput.css'

const customStyles = {

  control: (provided) => ({
    ...provided,
    border: 'none',
    background: 'transparent',
    borderBottom: '2px solid silver', // Customize the underline style here
    borderRadius: 0, // Remove the default border-radius
    boxShadow: 'none', // Remove the default box-shadow
    outline: 'none',
    display: 'flex',
    width: '112%',
    transition: '0.2s',
    padding: 0,
    color: '#FFF',
    ':hover': {
      borderBottomColor: '#DB630C',
      color: '#DB630C'
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#FFF',
    fontSize: '2.3vh',
    fontWeight: 100,
    marginLeft: '-5px',
    padding: 0
  }),

  option: (provided) => ({
    ...provided,
    padding: '0', // Adjust padding for the options as needed'
    backgroundColor: '#07080B',
    color: '#FFF',
    ':hover': {
      backgroundColor: '#1967d2'
    }
  }),
};

const MultiSelectInput = (props) => {
  const options = props.options
  const [selectedOptions, setSelectedOptions] = useState();
  const [displayMessage, setDisplayMessage] = useState("")
  const [focused, setFocused] = useState(false)

  const handleFocus = (e) => {
    setFocused(true)
    if(selectedOptions === null){
      setDisplayMessage(props.errorMessage)
    } else {
      setDisplayMessage("")
    }
  }



  return (
    <div className='wrapperSelect'>
      <div className='inputDataSelect'>
      <Select 
        options={options}
        isMulti
        value={props.selectedOptions}
        onChange={props.handleSelectChange}
        styles={customStyles}
        placeholder='Select Favorite Genres'
        onBlur={handleFocus}
      />
      </div>
      <span className='errorS'>{displayMessage}</span>
    </div>
  )
}

export default MultiSelectInput