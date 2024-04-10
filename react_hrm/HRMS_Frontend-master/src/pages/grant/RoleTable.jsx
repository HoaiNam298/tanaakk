import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Button } from 'semantic-ui-react';
import UserService from '../../services/UserService';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
const RoleTable = () => {
  const [token, setToken] = useState();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [changeUsers, setChangeUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (
      Cookies.get('username') !== null &&
      Cookies.get('username') !== undefined &&
      Cookies.get('token') !== null &&
      Cookies.get('token') !== undefined
    ) {
      setToken(Cookies.get('token'));
    } else {
      history.push('/signin');
    }

    if (token != null) {
      let userService = new UserService();
      userService.getUsers(token).then((result) => {
        setUsers(result.data);
      }).catch((error) => {
        if (error.response && error.response.status === 403) {
          swal({
            title: "You must have admin grant",
            text: "Click",
            icon: "error",
          });
          history.push("/home")
        }
      });
      userService.getRoles(token).then((result) => {
        setRoles(result.data);
      }).catch((error) => {
        if (error.response && error.response.status === 403) {
          swal({
            title: "You must have admin grant",
            text: "Click",
            icon: "error",
          });
          history.push("/home")
        }
      });
    }
  }, [Cookies.get('token'), token]);
  useEffect(() => {

  }, [users, roles])
  const handleCheckboxChange = (userId, roleName) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) => {
        if (user.id === userId) {
          const existingRole = user.roles.find((role) => role.name === roleName);
          if (existingRole) {
            // Nếu vai trò đã tồn tại trong danh sách, loại bỏ
            user.roles = user.roles.filter((role) => role.name !== roleName);
            // Nếu là ROLE_ADMIN, loại bỏ tất cả các vai trò khác
            if (roleName === 'ROLE_ADMIN') {
              user.roles = user.roles.filter((role) => role.name === 'ROLE_ADMIN');
            }
            if (!changeUsers.find((changedUser) => changedUser.id === userId)) {
              setChangeUsers((prevChangeUser) => [...prevChangeUser, user]);
            }
          } else {
            // Nếu vai trò không tồn tại trong danh sách, thêm vào
            const roleToAdd = roles.find((role) => role.name === roleName);
            if (roleToAdd) {
              user.roles.push(roleToAdd);
              // Nếu đang thêm ROLE_ADMIN, thêm tất cả các vai trò khác
              if (roleName === 'ROLE_ADMIN') {
                roles.forEach((role) => {
                  if (role.name !== 'ROLE_ADMIN') {
                    user.roles.push(role);
                  }
                });
              }

              // Thêm người dùng vào danh sách thay đổi
              if (!changeUsers.find((changedUser) => changedUser.id === userId)) {
                setChangeUsers((prevChangeUser) => [...prevChangeUser, user]);
              }
            }
          }
        }
        return user;
      });

      return updatedUsers;
    });
  };
  const handleSubmit = () => {
    let service = new UserService();
    service.saveUsers(changeUsers, token).then((result) => {
      if (result?.data === "success") {
        swal({
          title: "ok",
          text: "Employee added. After system user's confirmation, it will be listed.",
          icon: "success",
        });
        history.push(`/grant`)
      }
    })
  }
  console.log(users)
  console.log(roles)
  console.log(changeUsers)
  return (
    <div>
      <Table celled padded inverted textAlign="center">
        <Table.Header>
          <Table.Row style={{ background: 'gray' }}>
            <Table.HeaderCell>Tên User</Table.HeaderCell>
            <Table.HeaderCell>Admin</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Employee</Table.HeaderCell>
            <Table.HeaderCell>Employer</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body textAlign="center">
          {users?.map((u) => (
            <Table.Row key={u.id}>
              <Table.HeaderCell>{u.email}</Table.HeaderCell>
              <Table.HeaderCell>
                <input type='checkbox'
                  checked={u.roles.some((role) => role.name === 'ROLE_ADMIN')}
                  onChange={() => handleCheckboxChange(u.id, 'ROLE_ADMIN')}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <input type='checkbox'
                  checked={u.roles.some((role) => role.name === 'ROLE_USER')}
                  onChange={() => handleCheckboxChange(u.id, 'ROLE_USER')}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <input type='checkbox'
                  checked={u.roles.some((role) => role.name === 'ROLE_EMPLOYEE')}
                  onChange={() => handleCheckboxChange(u.id, 'ROLE_EMPLOYEE')}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <input type='checkbox'
                  checked={u.roles.some((role) => role.name === 'ROLE_EMPLOYER')}
                  onChange={() => handleCheckboxChange(u.id, 'ROLE_EMPLOYER')}
                />
              </Table.HeaderCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button color="green" onClick={handleSubmit}>
        Save Changes
      </Button>
    </div>
  );
};

export default RoleTable;
