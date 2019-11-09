import React from 'react'

const Pagination = ({ employeePerPage, totalEmployees, paginate, currentPage, currentLevel }) => {
    const pageNumbers = [];
    employeePerPage = parseInt(employeePerPage);
    for (let i = 1; i <= Math.ceil(totalEmployees / employeePerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div>
            <nav>
                <div className="row">
                    <div className="col-md-9 text-left">
                        <p className="text-left">Showing { employeePerPage === currentLevel.length ? employeePerPage: currentLevel.length} of {totalEmployees} records</p>
                    </div>
                    <div className="col-md-3 text-right">
                        <ul className="pagination">
                            {pageNumbers.map(number => (
                                <li key={number} className="page-item">
                                    <a onClick={() => paginate(number)} className={(currentPage === number ? 'pagination-active ': '') + 'page-link'}>
                                        {number}
                                    </a>
                                </li>
                            ))}
                        </ul> 
                    </div>
                </div> 
           </nav>
        </div>
    )
}

export default Pagination
