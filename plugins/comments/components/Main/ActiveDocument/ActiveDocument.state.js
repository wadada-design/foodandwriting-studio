import React from 'react'

export const ActiveDocumentContext = React.createContext()

export const initialState = []

export const activeDocumentReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return [...state, ...action.payload]

        default:
            throw new Error('Invalid action type')
    }
}
