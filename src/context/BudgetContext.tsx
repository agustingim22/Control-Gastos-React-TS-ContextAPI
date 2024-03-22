import React, { useReducer, createContext, ReactNode } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/BudgetReducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: React.Dispatch<BudgetActions>
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)


export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    return(
        <BudgetContext.Provider
            value={{state, dispatch}}
        >
            {children}
        </BudgetContext.Provider>

    )
}