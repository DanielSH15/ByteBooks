import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './UserManagement.css'
import {FaEdit, FaTrash, FaSave} from 'react-icons/fa'
import {HiUserAdd, HiX} from 'react-icons/hi'
import { DataGrid, GridRowModes, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { PropTypes } from 'prop-types';
import moment from 'moment';


const UserManagement = () => {
    const [data, setData] = useState([])
    const [records, setRecords] = useState(data)
    const[rowModesModel, setRowModesModel] = useState({})
    const [user, setUser] = useState([])
    const [error, setError] = useState('')
    const [insertRow, setInsertRow] = useState({})
    
    const handleRowEditStart = (params, event) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleRowEditStop = (params, event) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  
    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    const handleDeleteClick = (id) => () => {
      setRecords(data.filter((row) => row.userId !== id));
      axios.delete(`http://localhost:5226/api/user/${id}`).then((response) => {
 })
    };
  
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
  
      const editedRow = records.find((row) => row.userId === id);
      if (editedRow.isNew) {
        setRecords(data.filter((row) => row.userId !== id));
      }
    };
  
    const processRowUpdate = async (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      setRecords(data.map((row) => (row.userId === newRow.userId ? updatedRow : row)));
      try{
        var dateString = moment(updatedRow.dateOfBirth).format('YYYY-MM-DD')
        updatedRow.dateOfBirth = dateString
        if(insertRow.userId !== updatedRow.userId){
          await axios.put(`http://localhost:5226/api/user`, updatedRow).then((response) => {
            console.log(updatedRow.accessKey)
        })
        } else {
          const insert = {
            firstName: updatedRow.firstName,
            lastName: updatedRow.lastName,
            username: updatedRow.username,
            email: updatedRow.email,
            password: updatedRow.password,
            phone: updatedRow.phone,
            dateOfBirth: updatedRow.dateOfBirth,
            genre: updatedRow.genre,
            gender: updatedRow.gender,
            accessKey: updatedRow.accessKey
          }
          await axios.post(`http://localhost:5226/api/user`, insert).then((response) => {
            console.log(response.data)
          })
        }  
          
        
      } catch(e){
        if(e.response && e.response.status >= 400 && e.response.status <= 500){
          setError(e.response.data)
          console.log(error)
      }
      }
      return updatedRow;
    };


  const gender = [{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}]
  const genres = [
    {value: 'Horror', label: 'Horror'},
    {value: "Fantasy", label: "Fantasy"},
    {value: "Detective", label: "Detective"},
    {value: "Science Fiction", label: "Science Fiction"}
  ]
    const columns = [
      {field: 'firstName', headerName: 'First Name', type: 'text', width: '165', editable: true},
      {field: 'lastName', headerName: 'Last name', type: 'text', width: '165', editable: true},
      {field: 'username', headerName: 'Username', type: 'text', width: '165', editable: true},
      {field: 'email', headerName: 'Email', type: 'text', width: '165', editable: true},
      {field: 'password', headerName: 'Password', type: 'text', width: '165', editable: true},
      {field: 'phone', headerName: 'Phone', type: 'text', width: '165', editable: true},
      {field: 'dateOfBirth', headerName: 'Birthday', type: 'date', width: '165', valueFormatter: params => 
      moment(params?.value).format("DD/MM/YYYY"), editable: true},
      {field: 'genre', headerName: 'Genre', type: 'singleSelect', valueOptions: genres, width: '165', editable: true},
      {field: 'gender', headerName: 'Gender', type: 'singleSelect', valueOptions: gender, width: '165', editable: true},
      {field: 'accessKey', headerName: 'Access Key', type: 'number', width: '165', editable: true},
      {field: 'actions',  type: 'actions',
      headerName: 'Actions',
      width: '165',
      cellClassName: 'actions', getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<FaSave />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<HiX style={{color: "#07080B"}} />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        
        return [
          <GridActionsCellItem
            icon={<FaEdit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<FaTrash />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      }
      }
    ] 
    
    

    function EditToolbar(props){
      const { setData, setRowModesModel } = props;

      const handleClick = () => {
        const id = data[data.length - 1].userId + 1;
        setRecords((oldData) => [...oldData, {userId: id, firstName: '', lastName: '', username: '', email: '', password: '', phone: '', dateOfBirth: '', genre: '', gender: '', accessKey: '', isNew: true}])
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [id]: {mode: GridRowModes.Edit, fieldToFocus: 'firstName'}
        }))
        setInsertRow({userId: id, firstName: '', lastName: '', username: '', email: '', password: '', phone: '', dateOfBirth: '', genre: '', gender: '', accessKey: ''})
      }

      return (
        <GridToolbarContainer>
        <Button color="primary" startIcon={<HiUserAdd />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
      );
    }
      
    EditToolbar.propTypes = {
      setRowModesModel: PropTypes.func.isRequired,
      setData: PropTypes.func.isRequired,
    }

    const onRowsSelectionHandler = (ids) => {
      const selectedRowsData = ids.map((id) => data.find((row) => row.userId === id));
      setUser(selectedRowsData)
      console.log(user)
    };

    const handleFilter = (e) => {
      const newData = data.filter(row => {
        return row.username.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setRecords(newData)
    }

    useEffect(() => {
      axios.get('http://localhost:5226/api/user')
       .then((response) => {
        console.log(response.data.Value)
        setData(response.data.Value)
        setRecords(response.data.Value)
       })
    }, [])

   

    return(
        <div>
          <div className='search-user'><input type='text' onChange={handleFilter} placeholder='Search By Username'/></div>
           <Box sx={{ height: 550, width: '100%', backgroundColor: '#07080B' }}>
              <DataGrid 
              rows={records}
              columns={columns}
              getRowId={(row) => (row.userId)}
              editMode = "row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              components={{ Toolbar: EditToolbar }}
              componentsProps = {{
                toolbar: {setData, setRowModesModel}
              }}
              onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
              style={{color: '#FFFFFF', border: 'none'}}
              />
           </Box>
        </div> 
    )
}

export default UserManagement