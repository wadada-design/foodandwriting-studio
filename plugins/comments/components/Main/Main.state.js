import React from 'react'

export const MainContext = React.createContext()

// Reducer for main comments state
export const initalState = { documents: null, activeDoc: null }

export const mainReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DOCS':
            return { ...state, documents: action.payload }

        case 'SET_ACTIVE_DOC':
            return { ...state, activeDoc: action.payload }

        default:
            throw new Error('Invalid action type')
    }
}