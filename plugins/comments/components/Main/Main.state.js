import React from 'react'

// Reducer for main comments state
export const MainContext = React.createContext()

export const mainReducer = (state, action) => {
    switch (action.type) {
        case 'setComments':
            return { ...state, comments: action.payload }

        default:
            throw new Error('Invalid action type')
    }
}