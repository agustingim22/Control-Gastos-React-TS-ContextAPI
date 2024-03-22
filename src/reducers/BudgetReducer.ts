
export type BudgetActions = 
    { type: 'addBudgey', payload: {budget: number} } |
    { type: 'showModal' } | {type: 'closeModal'}


export type BudgetState ={
    budget: number
    modal: boolean
}

export const initialState : BudgetState = {
    budget: 0,
    modal: false
}



export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {  
    
    if(action.type === "addBudgey"){
        
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if(action.type === "showModal"){
        return {
            ...state,
            modal: true
        }
    }
    
    if(action.type === "closeModal"){
        return {
            ...state,
            modal: false
        }
    }
  
    return state
}


