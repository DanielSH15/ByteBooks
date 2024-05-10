import React from 'react'
import { Table } from 'react-bootstrap'
import UserItem from '../UserItem/UserItem'

const tableStyle = {
    textAlign: 'center',
    fontSize: '20px',
    backgroundColor: '#07080B',
    color: '#FFF'
}

const UsersTable = ({users, onEditClick}) => {
  return (
    <Table striped bordered hover style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Icon</th>
            <th>Username</th>
            <th>Access Key</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <UserItem user={user} onEditClick={onEditClick} key={user.userId}/>
        ))}
      </tbody>
    </Table>
  )
}

export default UsersTable