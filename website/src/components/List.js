import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import MyModal from './Modal'
import Commit from './Commit'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getRepositories, getCommits } from '../actions/App.action'

const List = () => {
    const { repositories, commits, repositoriesError } = useSelector(
        (state) => ({
            repositories: state.repositories.list,
            commits: state.repositories.commits,
            repositoriesError: state.repositories.errorMessage,
        }),
        shallowEqual
    )

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRepositories('Facebook'))
    }, [dispatch])

    return (
        <Row>
            {repositoriesError ? <MyModal message={repositoriesError} /> : ''}
            <Navbar
                expand="xs"
                bg="dark"
                variant="dark"
                style={{ display: 'inline' }}
                className="overflow-hidden"
            >
                <Col className="p-0" xs="1" md="1">
                    <Navbar.Toggle />
                </Col>

                <Navbar.Collapse>
                    <Form inline className="align-items-center my-2">
                        <Form.Row>
                            <Col xs="8" md="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                />
                            </Col>
                            <Col xs="auto" md="auto">
                                <Button variant="primary">Search</Button>
                            </Col>
                        </Form.Row>
                    </Form>

                    <Nav className="mr-auto flex-column">
                        {repositories &&
                            repositories.map((v, k) => {
                                return (
                                    <Nav.Item key={k}>
                                        <Nav.Link
                                            eventKey={k}
                                            onClick={() =>
                                                dispatch(
                                                    getCommits(
                                                        'Facebook',
                                                        v.name
                                                    )
                                                )
                                            }
                                        >
                                            {v.name}
                                        </Nav.Link>
                                    </Nav.Item>
                                )
                            })}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Col className="p-0 pl-md-2">
                {commits.length > 0 ? (
                    <Commit commits={this.props.commits} />
                ) : (
                    <Card style={{ paddingTop: '5px' }}>
                        <Card.Body>
                            Please select a project in sidebar.
                        </Card.Body>
                    </Card>
                )}
            </Col>
        </Row>
    )
}

export default List
