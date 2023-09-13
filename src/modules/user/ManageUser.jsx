import View from "../../components/action/View";
import Table from "../../components/table/Table";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import ModalViewUser from "../../components/modal/ModalViewUser";
import ModalUpdateUser from "../../components/modal/ModalUpdateUser";
import ModalCreateUser from "../../components/modal/ModalCreateUser";
import Edit from "../../components/action/Edit";
import Delete from "../../components/action/Delete";
import Button from "../../components/button/Button";
import { useState, useEffect } from "react";
import {
  deleteUser,
  getAllUserWithPagination,
} from "../../services/userServices";
import "../../styles/ManageUser.scss";

const ManageUser = () => {
  const LIMIT_USER_PER_PAGE = 5;
  const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
  const [isShowModalUpdateUser, setIsShowModalUpdateUser] = useState(false);
  const [isShowModalViewUser, setIsShowModalViewUser] = useState(false);
  const [dropdownLabel, setDropdownLabel] = useState("Please select your role");
  const [dataUpdate, setDataUpdate] = useState(null);
  const [dataView, setDataView] = useState(null);
  const [listUsers, setListUsers] = useState([]);
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchListUsers = async (page) => {
    const res = await getAllUserWithPagination(page, LIMIT_USER_PER_PAGE);
    if (res && res.EC === 0) {
      setListUsers(res.DT?.users);
      setPageCount(res.DT?.totalPages);
    }
  };
  const handlePageClick = (event) => {
    fetchListUsers(Number(event.selected + 1));
    setCurrentPage(Number(event.selected + 1));
  };
  const handleBtnEdit = (user, userRole) => {
    setIsShowModalUpdateUser(true);
    setDropdownLabel(userRole);
    setDataUpdate(user);
  };
  const handleBtnView = (user, userRole) => {
    setIsShowModalViewUser(true);
    setDropdownLabel(userRole);
    setDataView(user);
  };
  const handleBtnDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete user whose gmail is: ${user?.email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUser(user?.id);
        if (res && res.EC === 0) {
          fetchListUsers(currentPage);
          Swal.fire("Deleted!", "User has been deleted.", "success");
        }
      }
    });
  };
  useEffect(() => {
    fetchListUsers(1);
  }, []);
  return (
    <div>
      <Button
        bgc="blue"
        noBorder={true}
        onClick={() => setIsShowModalCreateUser(true)}
      >
        Add new user
      </Button>
      <div className="w-100 list-user">
        <h1>List Users</h1>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listUsers &&
              listUsers.length > 0 &&
              listUsers.map((user) => (
                <tr key={user?.id}>
                  <td>{user?.id}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <View onClick={() => handleBtnView(user, user?.role)} />
                      <Edit onClick={() => handleBtnEdit(user, user?.role)} />
                      <Delete onClick={() => handleBtnDelete(user)} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="pagination">
          <ReactPaginate
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< Pre"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
          />
        </div>
      </div>
      <ModalCreateUser
        show={isShowModalCreateUser}
        setShow={setIsShowModalCreateUser}
        fetchListUsers={fetchListUsers}
        setCurrentPage={setCurrentPage}
      />
      <ModalUpdateUser
        show={isShowModalUpdateUser}
        setShow={setIsShowModalUpdateUser}
        dataUpdate={dataUpdate}
        currentPage={currentPage}
        fetchListUsers={fetchListUsers}
        label={dropdownLabel}
      />
      <ModalViewUser
        show={isShowModalViewUser}
        setShow={setIsShowModalViewUser}
        dataView={dataView}
        label={dropdownLabel}
      />
    </div>
  );
};

export default ManageUser;
