import React from 'react';
import SalaryItem from './SalaryItem';

import './SalaryList.css';


// function SalaryList({ salaries }) {
//     console.log("Salaries inside SalaryList:", salaries);  // Log the salaries here
//     return (
//         <div className="salary-list">
//             {salaries.map((salary, index) => 
//     <SalaryItem 
//         key={`${salary.emp_no}-${index}`} 
//         salary={salary}
//     />
// )}

//         </div>
//     );
// }
function SalaryList({ salaries, onEdit, onDelete }) {
    return (
        <div className="salary-list">
            {salaries.map((salary, index) => 
                <SalaryItem 
                    key={`${salary.emp_no}-${index}`} 
                    salary={salary}
                    onEdit={onEdit} // Passing down the onEdit function
                    onDelete={onDelete} // Similarly, ensure onDelete is passed too
                />
            )}
        </div>
    );
}



export default SalaryList;
