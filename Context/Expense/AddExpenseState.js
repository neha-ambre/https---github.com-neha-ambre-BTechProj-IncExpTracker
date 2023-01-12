import react, {useState} from "react";
import AddExpenseContext from "./AddExpenseContext";

const AddExpenseState = (props) => {
    
    const [ExpenseAdded,isExpenseAdded] = useState(false)

    return(
        <AddExpenseContext.Provider value ={ExpenseAdded}>
            {props.children}
        </AddExpenseContext.Provider>
    )
}

export default AddExpenseState;