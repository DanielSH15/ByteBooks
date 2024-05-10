import React, {useState, useEffect} from 'react'
import Select from 'react-select';
import './MultiSelectDataField.css'
import ContentModal from '../../../../components/Modals/ContentModal/ContentModal';

const customStyles = {

    control: (provided) => ({
      ...provided,
      border: 'none',
      background: 'transparent',
      borderRadius: 0, // Remove the default border-radius
      boxShadow: 'none', // Remove the default box-shadow
      outline: 'none',
      display: 'flex',
      width: '100%',
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
      padding: '0',
      backgroundColor: '#07080B',
      color: '#FFF',
      ':hover': {
        backgroundColor: '#1967d2'
      }
    }),
  };


const MultiSelectDataField = (props) => {
    const options = props.options
    const [selectedOptions, setSelectedOptions] = useState();
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
      setSelectedOptions(props.selectedOptions);
      console.log(props.selectedOptions)
    }, [props.selectedOptions]);
    

    
  return (
    <div className='multi-select-input-wrapper'>
        <div className="multi-select-label-container">
            <div className="multi-select-label">{props.label}</div>
        </div>
        <div className="multi-select-input-contents">
            <div className="multi-select-data">
              {
                props.isMulti ? (
                  <button onClick={() => setModalOpen(true)} className='multi-select-button'><span>SELECT</span></button>
                ) : (
                  <select defaultValue={props.selectedOptions}  onChange={props.onChange} onBlur={props.onBlur} className='select-data-field'>
                    {
                      options.map((value, i) => {
                        if(value === props.selectedOptions){
                          return <option key={i} selected>{value}</option>
                        } else {
                          return <option key={i}>{value}</option>
                        }
                      })
                    }
                  </select>
                )
              }
            </div>
        </div>
        <ContentModal show={modalOpen} onHide={() => setModalOpen(false)} content={<Select 
          options={options}
          isMulti = {props.isMulti}
          value={props.selectedOptions}
          onChange={props.onChange}
          placeholder={props.placeholder}
          onBlur={props.onBlur}
          styles={customStyles}
        />}/>
    </div>
  )
}

export default MultiSelectDataField