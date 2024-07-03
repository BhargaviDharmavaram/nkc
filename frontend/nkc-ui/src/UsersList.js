import {React} from 'react'

const UsersList = (props) => {
    const {users, removeUser, editUser} = props

    return(
        <div>
            <h1> Users List </h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, i)=>{
                        return(
                            <tr key={user._id}>
                                <td>{i + 1}</td>
                                <td>{user.name}</td>
                                <td><button onClick={()=> editUser(user._id, user.name)}>Edit</button>
                                    <button onClick={() => removeUser(user._id, user.name)}>Remove</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UsersList