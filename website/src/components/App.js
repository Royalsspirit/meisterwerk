import React from 'react'
import logo from './logo.svg'
import './App.css'
import List from './List'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const App = () => {
    return (
        <div className="App">

<header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                        </header>
            <Container fluid>

                <List />
            </Container>
        </div>
    )
}

export default App
