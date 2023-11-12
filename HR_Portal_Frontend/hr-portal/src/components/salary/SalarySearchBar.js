 import React, { useState } from 'react';

// function SalarySearchBar({ onSearch }) {
//     const [term, setTerm] = useState('');

//     return (
//         <div>
//             <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search by Employee Name or Number" />
//             <button onClick={() => onSearch(term)}>Search</button>
//         </div>
//     );
// }

// export default SalarySearchBar;


// SalarySearchBar.js
function SalarySearchBar({ onSearch }) {
    const [term, setTerm] = useState('');

    const handleSearch = () => {
        onSearch(term);
    };

    return (
        <div>
            <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search by Employee Name or Number" />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SalarySearchBar;
