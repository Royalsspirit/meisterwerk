import React from 'react'
import logo from './logo.svg'
import './App.css'
import List from './List.container'
import Container from 'react-bootstrap/Container'
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
