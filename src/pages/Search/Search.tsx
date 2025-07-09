import React from "react";
import { Link } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import UserList from "../../components/UserList/UserList";

const Search: React.FC = () => {
  document.title = "Tìm kiếm | Threads.net";
  return (
    <div>
      <div className="text-center">
        <h3>Tìm kiếm</h3>
      </div>
      <div className="w-[90vh] max-w-[90vh] border border-slate-200 px-5 py-5 rounded-md shadow-lg">
        <TextField
          label="Tìm kiếm"
          id="outlined-start-adornment"
          sx={{ width: "100%" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </InputAdornment>
              ),
            },
          }}
        />
        <div className="mt-5">
          <p className="text-slate-500">Gợi ý theo dõi</p>
          <UserList />
          <UserList />
          <UserList />
          <UserList />
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default Search;
