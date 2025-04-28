import React from "react";
import { Pagination } from "@mui/material";

function PaginationComponent(className="", count=10) {
  return (
    <div>
      <Pagination count={count} variant="outlined" color="primary" className={`${className}`}/>
    </div>
  );
}

export default PaginationComponent;
