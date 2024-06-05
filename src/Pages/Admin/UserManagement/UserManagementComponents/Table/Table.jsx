import React, {useState} from 'react'
import { Table, Button, ButtonGroup } from 'react-bootstrap'
import UserItem from '../UserItem/UserItem'
import {FaSort} from 'react-icons/fa'
import './Table.css'

const tableStyle = {
    textAlign: 'center',
    fontSize: '20px',
    backgroundColor: '#07080B',
    color: '#FFF'
}

const UsersTable = ({users, onEditClick}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const currentUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };


  return (
    <div className='users-table-container'>
      <Table striped bordered hover style={tableStyle}>
        <thead>
          <tr>
            <th>ID <FaSort onClick={() => requestSort('userId')} style={{cursor: 'pointer'}}/></th>
            <th>Icon</th>
            <th>Username <FaSort onClick={() => requestSort('userId')} style={{cursor: 'pointer'}}/></th>
            <th>Access Key <FaSort onClick={() => requestSort('userId')} style={{cursor: 'pointer'}}/></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {currentUsers.map(user => (
          <UserItem user={user} onEditClick={onEditClick} key={user.userId}/>
        ))}
      </tbody>
      </Table>
      <div className="page-buttons-container">
        <ButtonGroup>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1} style={{margin: '10px'}}>
            Previous
          </Button>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages} style={{margin: '10px'}}>
            Next
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default UsersTable