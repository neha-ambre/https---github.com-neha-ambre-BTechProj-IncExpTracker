import react, {useState} from "react";
import AddIncomeContext from "./AddIncomeContext";

const AddIncomeState = (props) => {
    
    const [incomeAdded,isIncomeAdded] = useState(false)

    return(
        <AddIncomeContext.Provider value ={incomeAdded}>
            {props.children}
        </AddIncomeContext.Provider>
    )
}

export default AddIncomeState;