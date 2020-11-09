import React from 'react'
import App from '../components/App'
import { shallow } from 'enzyme'

describe('App component', () => {
    const getWrapper = shallow(<App />)

    it('render without crashing', () => {
        expect(getWrapper).toMatchSnapshot()
    })
})
