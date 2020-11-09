import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import MyModal from './Modal'
import Commit from './Commit'
import Card from 'react-bootstrap/Card'

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: this.props.repositories.errorMessage,
        }
    }

    componentDidMount() {
        this.props.loadRepositories('Facebook')
    }

    commits = (e) => {
        this.props.loadCommits('Facebook', e)
    }
    render() {
        return (
            <Row>
                {this.props.errorMessage ? (
                    <MyModal message={this.props.errorMessage} />
                ) : (
                    ''
                )}
                <Navbar
                    expand="xs"
                    bg="dark"
                    variant="dark"
                    style={{ display: 'inline' }}
                >
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="mr-auto flex-column">
                            {this.props.repositories &&
                                this.props.repositories.map((v, k) => {
                                    return (
                                        <Nav.Item key={k}>
                                            <Nav.Link
                                                eventKey={k}
                                                onClick={() =>
                                                    this.commits(v.name)
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
                <Col>
                    {this.props.commits.length > 0 ? (
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
}
List.propTypes = {
    loadRepositories: PropTypes.func.isRequired,
    loadCommits: PropTypes.func.isRequired,
}
export default List
