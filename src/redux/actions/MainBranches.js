import {MainBranchesTypes} from "../types/MainBranchesTypes";

export const PendingStatements = (statements) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.DELIVERY_PENDING_STATEMENT,
            payload: statements
        })
    }
}
export const ApprovedStatements = (statements) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.DELIVERY_APPROVED_STATEMENT,
            payload: statements
        })
    }
}
export const DailyStatementRecords = (statements) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.DAILY_STATEMENT_RECORD,
            payload: statements
        })
    }
}

export const DailyStatementExpensesList = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.DAILY_STATEMENT_EXPENSES_LIST,
            payload: data
        })
    }
}

export const DailyStatementTotalExpenses = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.DAILY_STATEMENT_TOTAL_EXPENSES,
            payload: data
        })
    }
}
export const DailyStatementPettyCash = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.DAILY_STATEMENT_PETTY_CASH,
            payload: data
        })
    }
}
export const DailyStatementTotalPettyCash = (data,expenses=0) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.DAILY_STATEMENT_TOTAL_PETTY_CASH,
            payload: data,
            expenses:expenses
        })
    }
}
export const DailyStatements= (data) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.DAILY_STATEMENT,
            payload: data
        })
    }
}
export const DailyStatementTotalDeposit= (toDeposit, providedPettyCash=0,totalCommission=0) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.DAILY_STATEMENT_TOTAL_DEPOSIT,
            payload: toDeposit,
            providedPettyCash:providedPettyCash,
            totalCommission:totalCommission
        })
    }
}
export const DailyStatementTotalCommission= (data) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.DAILY_STATEMENT_TOTAL_COMMISSION,
            payload: data
        })
    }
}
export const DailyStatementTotalCashCollected= (data) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.DAILY_STATEMENT_TOTAL_CASH_COLLECTED,
            payload: data
        })
    }
}
export const DailyStatementTotalDeliveryCharge= (data) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.DAILY_STATEMENT_TOTAL_DELIVERY_CHARGE,
            payload: data
        })
    }
}
export const CurrentPettyCash= (data) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.CURRENT_PETTY_CASH,
            payload: data
        })
    }
}
export const getPendingDailyStatements= (data) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.PENDING_DAILY_STATEMENT,
            payload: data
        })
    }
}
export const getApprovedDailyStatements= (data) => {
    return(dispatch) => {
        dispatch({
            type: MainBranchesTypes.APPROVED_DAILY_STATEMENT,
            payload: data
        })
    }
}


