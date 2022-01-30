import {AdminBranchesType} from "../types/AdminBranchesType";

 const initialState = {
      branchesList:[],
     BranchUpdate:[],

    }
    const AdminBranchesReducer=(state = initialState, action)=>{

         switch (action.type) {
            case AdminBranchesType.MAIN_ADMIN_BRANCHES:
                return {
                    ...state,
                    branchesList: action.payload
                }
            case AdminBranchesType.MAIN_ADMIN_BRANCHES_UPDATE:
            return {
                ...state,
                BranchUpdate: action.payload
            }

            default:
                return state;
        }
    }

    export default AdminBranchesReducer