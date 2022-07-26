import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import MainReducer from "../store/mainReducer"

import Navigation from "../components/Navigation";

const renderWithRedux = (
    component:any,
    { store=createStore(MainReducer)} = {}
) => {
return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
}
}

describe('Redux testing', () => {
    it('checks initial state', ()=> {
        const {getByRole} = renderWithRedux(<Navigation/>)

        expect(screen.getByText('All')).toBeInTheDocument()
    })
})