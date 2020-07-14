import React from 'react'

export const MainContext = React.createContext()

// Reducer for main comments state
export const mainReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DOC_IDS':
            return { ...state, docIds: action.payload }

        default:
            throw new Error('Invalid action type')
    }
}