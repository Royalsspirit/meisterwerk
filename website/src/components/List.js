import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Card from 'react-bootstrap/Card'
import MyModal from './Modal'
import Commit from "./Commit";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.repositories.errorMessage
    }
  }

  componentDidMount() {
    this.props.loadRepositories("Facebook")
  }

  commits = (e) => {
    this.props.loadCommits("Facebook", e);
  };
  render() {
    return (
      <Row>
        <Col sm={5}>
          {
            this.props.errorMessage ? <MyModal message={this.props.errorMessage} />:''
          }
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Project name</th>
              </tr>
            </thead>
            <tbody>
              {this.props.repositories &&
                this.props.repositories.map((v, k) => {
                  return (
                    <tr key={k}>
                      <td onClick={() => this.commits(v.name)}>{v.name}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
        <Col sm={7}>
          { this.props.commits.length > 0 ? (
                <Commit commits={this.props.commits} />
          ):(
            <Card style={{paddingTop:'5px'}}>
              <Card.Body>Please select a project in sidebar.</Card.Body>
            </Card>
          )
        }
        </Col>
      </Row>
    );
  }
}
List.propTypes = {
   loadRepositories: PropTypes.func.isRequired,
   loadCommits: PropTypes.func.isRequired,	
}
export default List;
