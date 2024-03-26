import { DraftExpense, Expense } from "../types"
import { v4 as uuidv4} from 'uuid'

export type BudgetActions = 
    { type: 'addBudgey', payload: {budget: number} } |
    { type: 'showModal' } | {type: 'closeModal'} | {type: 'add-expense', payload: {expense: DraftExpense}} |
    {type: 'removeExpense', payload: {id: Expense['id']}} | 
    {type: 'getExpenseById', payload: {id: Expense['id']}}



export type BudgetState ={
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
}

export const initialState : BudgetState = {
    budget: 0,
    modal: false,
    expenses: [],
    editingId: ''
}

const createExpense = (draftExpense : DraftExpense) : Expense => {
   return { ...draftExpense, id: uuidv4()} 
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

    if(action.type === "add-expense"){

        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if(action.type === "removeExpense"){
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    if(action.type === "getExpenseById"){
        return{
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }
  
    return state
}


