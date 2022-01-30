import {MainBranchesTypes} from "../types/MainBranchesTypes";

const initialState = {
    PendingStatements:[],
    ApprovedStatements:[],
    DailyStatementExpensesList:[],
    DailyStatementTotalExpenses:[],
    DailyStatementPettyCash:[],
    DailyStatementTotalPettyCash:'',
    DailyStatements:[],
    DailyStatementTotalCashCollected:'',
    DailyStatementTotalDeliveryCharge:'',
    DailyStatementTotalCommission:'',
    DailyStatementTotalDeposit:'',
    DailyStatementRecords:[],
    currentPettyCash:[],
    pendingDailyStatement:[],
    approvedDailyStatement:[],

}

const MainBranches = (state = initialState, action) => {
    switch (action.type) {
        case MainBranchesTypes.DELIVERY_PENDING_STATEMENT:
            return {
                ...state,
                PendingStatements: action.payload
            }
         case MainBranchesTypes.DELIVERY_APPROVED_STATEMENT:
            return {
                ...state,
                ApprovedStatements: action.payload
            }
            case MainBranchesTypes.DAILY_STATEMENT_EXPENSES_LIST:
            return {
                ...state,
                DailyStatementExpensesList: action.payload
            }
            case MainBranchesTypes.DAILY_STATEMENT_TOTAL_EXPENSES:
            return {
                ...state,
                DailyStatementTotalExpenses: action.payload
            }
             case MainBranchesTypes.DAILY_STATEMENT_PETTY_CASH:
            return {
                ...state,
               DailyStatementPettyCash: action.payload
            }
            case MainBranchesTypes.DAILY_STATEMENT_TOTAL_PETTY_CASH:
            return {
                ...state,
               DailyStatementTotalPettyCash: (action.payload-action.expenses)
            }
            case MainBranchesTypes.DAILY_STATEMENT_TOTAL_CASH_COLLECTED:
            return {
                ...state,
               DailyStatementTotalCashCollected: action.payload
            }
            case MainBranchesTypes.DAILY_STATEMENT:
            return {
                ...state,
               DailyStatements: action.payload
            }
            case MainBranchesTypes.DAILY_STATEMENT_TOTAL_COMMISSION:
            return {
                ...state,
               DailyStatementTotalCommission: action.payload
            }
            case MainBranchesTypes.DAILY_STATEMENT_TOTAL_DEPOSIT:
            return {
                ...state,
               DailyStatementTotalDeposit:(
                   action.payload-action.providedPettyCash-action.totalCommission
               )
            }
            case MainBranchesTypes.DAILY_STATEMENT_TOTAL_DELIVERY_CHARGE:
            return {
                ...state,
               DailyStatementTotalDeliveryCharge: action.payload
            }
            case MainBranchesTypes.DAILY_STATEMENT_RECORD:
            return {
                ...state,
               DailyStatementRecords: action.payload
            }
            case MainBranchesTypes.CURRENT_PETTY_CASH:
            return {
                ...state,
               currentPettyCash: action.payload
            }
            case MainBranchesTypes.PENDING_DAILY_STATEMENT:
            return {
                ...state,
               pendingDailyStatement: action.payload
            }
            case MainBranchesTypes.APPROVED_DAILY_STATEMENT:
            return {
                ...state,
               approvedDailyStatement: action.payload
            }
        default:
            return state;
    }
}

export default MainBranches;