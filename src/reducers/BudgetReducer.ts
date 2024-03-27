import { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4} from 'uuid'

export type BudgetActions = 
    { type: 'addBudgey', payload: {budget: number} } |
    { type: 'showModal' } | {type: 'closeModal'} | {type: 'add-expense', payload: {expense: DraftExpense}} |
    {type: 'removeExpense', payload: {id: Expense['id']}} | 
    {type: 'getExpenseById', payload: {id: Expense['id']}}|
    {type: 'updateExpense', payload: {expense: Expense}} |
    {type: 'resetApp'} | {type: 'filterByCategory', payload: {id: Category['id']}}



export type BudgetState ={
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']
}

const initialBudget = () : number =>{
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses= () : Expense[] =>{
    const localStorageExpenses =  localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse('localStorageExpenses') : []
}

export const initialState : BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
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
            modal: false,
            editingId: ''
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

    if(action.type === "updateExpense"){
        return{
            ...state,
            expense: state.expenses.map( expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingId: ''
        }
    }
    
    if(action.type === "resetApp"){
        return{
            ...state,
            budget:0,
            expenses: []
        }
    }

    if(action.type === "filterByCategory"){
        return{
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state
}


