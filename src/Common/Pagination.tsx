import React, { useState } from "react";

interface MyComponentProps {
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  maxPageNumberLimit: number;
  minPageNumberLimit: number;
  setcurrentPage: (currentPage: number) => void;
  setItemPerPage: (pageLimit: number) => void;
  setmaxPageNumberLimit: (maxPage: number) => void;
  setminPageNumberLimit: (minPage: number) => void;
}

function Pagination(props: MyComponentProps) {
  const [pageNumberLimit] = useState(5);
  let {
    totalCount,
    currentPage,
    itemsPerPage,
    maxPageNumberLimit,
    minPageNumberLimit,
    setcurrentPage,
    setItemPerPage,
    setmaxPageNumberLimit,
    setminPageNumberLimit,
  } = props;

  const pages: number[] = [];
  for (let i = 1; i <= Math.ceil(100 / itemsPerPage); i++) {
    pages.push(i);
  }

  const paginate = (pageNumber: number) => {
    setcurrentPage(pageNumber);
  };

  const handleNextbtn = () => {
    if (currentPage === pages[pages.length - 1]) {
      return;
    }
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    if (currentPage === pages[0]) {
      return;
    }
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li onClick={handleNextbtn} className="page-item">
        <span className="page-link">
          <em className="icon ni ni-more-h"></em>
        </span>
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li onClick={handlePrevbtn} className="page-item">
        <span className="page-link">
          <em className="icon ni ni-more-h"></em>
        </span>
      </li>
    );
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          onClick={() => paginate(number)}
          className={
            currentPage === number ? "active page-item " : "none page-item"
          }
        >
          <a className="page-link"> {number} </a>
        </li>
      );
    } else {
      return null;
    }
  });

  const handleChangePageLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = event.target
    setItemPerPage(parseInt(value))
  }

  return (
    <div className="card">
      <div className="card-inner">
        <div className="nk-block-between-md g-3">
          <div className="g">
            <ul className="pagination justify-content-center justify-content-md-start">
              <li className="page-item">
                {/* <a className="page-link" href="#">
                  <em className="icon ni ni-chevrons-left"></em>
                </a> */}
                <span
                  className={`page-link ${
                    currentPage !== pages[0] && "btn_active"
                  }`}
                  onClick={handlePrevbtn}
                >
                  Previous
                </span>
              </li>
              {pageDecrementBtn}
              {renderPageNumbers}
              {pageIncrementBtn}

              <li className="page-item">
                {/* <a className="page-link" href="#">
                  <em className="icon ni ni-chevrons-right"></em>
                </a> */}
                <span
                  className={`page-link ${
                    currentPage !== pages[pages.length - 1] && "btn_active"
                  }`}
                  onClick={handleNextbtn}
                >
                  Next
                </span>
              </li>
            </ul>
          </div>
          <div className="g">
            <div className="pagination-goto d-flex justify-content-center justify-content-md-start gx-3">
              <div>Page</div>
              <div>
                <select
                  className="form-select js-select2"
                  data-search="on"
                  data-dropdown="xs center"
                  onChange={(e) => handleChangePageLimit(e)}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                </select>
              </div>
              {/* <div>Showing 1 to 50 of 100 entries</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
