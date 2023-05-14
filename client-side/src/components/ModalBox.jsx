import { Fragment, useContext } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserTasksContext } from "../context/UserTasksContext";
import { toast } from 'react-toastify';

const ModalBox = () => {

    const { 
        show,  
        editID,
        editName, 
        setEditName,
        editAge, 
        setEditAge,
        editIsActive,
        setEditIsActive,
        handleClose,
        getData,
        clear, 
    } = useContext(UserTasksContext);

    const handleIsActiveChange = (e) => {
        if(e.target.checked) {
            setEditIsActive(1);
        } else {
            setEditIsActive(0);
        }
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

    return(
        <Fragment>
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

export default ModalBox;