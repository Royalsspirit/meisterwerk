import React from "react";

import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col"

const Commit = ({commits}) => {
  return (
      commits &&
        commits.map((v, k) => {
          return (
            <Card className="text-center">
              <Col md={{ span: 4, offset: 4 }}>
                <Card.Img style={{width:'100px'}} variant="top" src={v.Author.avatar_url ? v.Author.avatar_url: v.Committer.avatar_url} />
              </Col>
              <Card.Body>
                <Card.Text>{v.Commit.message.length > 150 ? v.Commit.message.substring(0,150)+"....":v.Commit.message}</Card.Text>
                <Card.Footer>
                  <small className="text-muted">{v.Commit.author.date}</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          );
        })
  );  
}
Commit.propTypes = {
	commits: PropTypes.array.isRequired
} 
export default Commit;
