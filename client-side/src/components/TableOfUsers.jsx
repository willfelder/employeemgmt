import { Fragment, useContext, useEffect } from "react";
import { UserTasksContext } from "../context/UserTasksContext";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalBox from "./ModalBox";
import InputContainer from "./InputContainer";

const TableOfUsers = () => {

    const { 
        data,
        setEditID,
        setEditName,
        setEditAge,
        setEditIsActive,
        handleShow,
        getData, 
    } = useContext(UserTasksContext);

    useEffect(() => {
        getData();
    },[])

    const handleEdit = id => {
        handleShow();
        axios.get(`https://localhost:7106/api/Employee/${id}`)
        .then((result) => {
            setEditID(id);
            setEditName(result.data.name);
            setEditAge(result.data.age);
            setEditIsActive(result.data.isActive);
        })
        .catch((error) => {
            toast.error(error);
        })
    };

    const handleDelete = id => {
        if(window.confirm("Are you sure you want to delete this employee? ") == true ) {
            axios.delete(`https://localhost:7106/api/Employee?id=${id}`)
            .then((result) => {
                if(result.status === 200) {
                    toast.success("The employee has been deleted.");
                    getData();
                }
            })
            .catch((error) => {
                toast.error(error);
            })
        }
    };

    return(
        <Fragment>
            <ToastContainer />
            <InputContainer />
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>IsActive</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length > 0 ?
                    data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.isActive}</td>
                                <td colSpan={2}>
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        Edit
                                    </button> &nbsp;
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                    :
                    <p>Loading...</p>
                }
            </tbody>
            </Table>
            <ModalBox />
        </Fragment>
    )
};

export default TableOfUsers;