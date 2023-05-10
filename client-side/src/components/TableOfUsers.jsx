import { Fragment, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableOfUsers = () => {

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [isActive, setIsActive] = useState(0);

    const [editID, setEditID] = useState("");
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState(0);
    const [editIsActive, setEditIsActive] = useState("");

    useEffect(() => {
        getData();
    },[])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getData = () => {
        axios.get('https://localhost:7106/api/Employee')
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const handleSaveEmployee = () => {
        const url = "https://localhost:7106/api/Employee";
        const data = {
            "name": name,
            "age": age,
            "isActive": isActive
        };

        axios.post(url, data)
        .then((result) => {
            getData();
            clear();
            toast.success("Employee has been added.");
        })
        .catch((error) => {
            toast.error(error);
        });
    };

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

    const handleUpdate = () => {
        const url = `https://localhost:7106/api/Employee/${editID}`;
        const data = {
            "id": editID,
            "name": editName,
            "age": editAge,
            "isActive": editIsActive
        }

        axios.put(url, data)
        .then((result) => {
            handleClose();
            getData();
            clear();
            toast.success("The emplyee has been updated.");
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
    
    const clear = () => {
        setName("");
        setAge("");
        setIsActive(0);
        setEditName("");
        setEditAge("");
        setEditIsActive("");
    };

    const handleActiveChange = (e) => {
        if(e.target.checked) {
            setIsActive(1);
        } else {
            setIsActive(0);
        }
    };

    const handleIsActiveChange = (e) => {
        if(e.target.checked) {
            setEditIsActive(1);
        } else {
            setEditIsActive(0);
        }
    };

    return(
        <Fragment>
            <ToastContainer />
            <Container>
                <Row>
                    <Col>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            />
                    </Col>
                    <Col>
                        <input 
                            type="checkbox"
                            checked={isActive === 1 ? true: false} 
                            value={isActive}
                            onChange={(e) => handleActiveChange(e)}
                        />
                        <label>IsActive</label>
                    </Col>
                    <Col>
                        <button 
                            className="btn btn-primary"
                            onClick={() => handleSaveEmployee()}
                        >
                            Submit
                        </button>
                    </Col>
                </Row>
            </Container>
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Enter age"
                                value={editAge}
                                onChange={(e) => setEditAge(e.target.value)}
                                />
                        </Col>
                        <Col>
                            <input 
                                type="checkbox" 
                                checked={editIsActive === 1 ? true : false}
                                value={editIsActive}
                                onChange={(e) => handleIsActiveChange(e)}
                            />
                            <label>IsActive</label>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
};

export default TableOfUsers;