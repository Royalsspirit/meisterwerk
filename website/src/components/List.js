import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import Commit from "./Commit";

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadRepositories("Facebook");
    console.log("repositories", this.props.repositories);
  }
  commits = (e) => {
    this.props.loadCommits("Facebook", e);
  };
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col sm={5}>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.repositories &&
                    this.props.repositories.map((v, k) => {
                      return (
                        <tr key={k}>
                          <td>{k}</td>
                          <td onClick={() => this.commits(v.name)}>{v.name}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
            <Col sm={7}>
	      { this.props.commits && (

              <Commit commits={this.props.commits} />
	      )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
List.propTypes = {
   loadRepositories: PropTypes.func.isRequired,
   loadCommits: PropTypes.func.isRequired,	
}
export default List;
