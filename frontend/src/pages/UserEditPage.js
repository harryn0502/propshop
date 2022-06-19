import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, editUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

function UserEditPage() {
    const { id: userId } = useParams();
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;

    const userEdit = useSelector((state) => state.userEdit);
    const {
        error: errorEdit,
        loading: loadingEdit,
        success: successEdit,
    } = userEdit;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            editUser({ _id: user._id, first_name, last_name, email, isAdmin })
        );
    };

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate("/admin/userlist");
        } else {
            if (!user.first_name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId));
            } else {
                setFirst_name(user.first_name);
                setLast_name(user.last_name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, userId, user, navigate, successEdit]);

    return (
        <div>
            <Link to="/admin/userlist">Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingEdit && <Loader />}
                {errorEdit && <Message variant="danger">{errorEdit}</Message>}
                {loading && <Loader /> ? (
                    error && <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="firstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter First Name"
                                value={first_name}
                                onChange={(e) => {
                                    setFirst_name(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="lastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter Last Name"
                                value={last_name}
                                onChange={(e) => {
                                    setLast_name(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="isadmin">
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => {
                                    console.log(e);
                                    setIsAdmin(e.target.checked);
                                }}
                            ></Form.Check>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );
}

export default UserEditPage;
