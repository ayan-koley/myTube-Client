import React from 'react'
import { TextField } from '@mui/material'

function Input({width="", fullWidth="true", color="info", className="", placeHolder="", label=""}) {
  return (
    <div className={`${width}`}>
        <TextField 
                  sx={
                    {
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderRadius: "12px",
                          borderTopRightRadius: "0",
                          borderEndEndRadius: "0"
                        },
                        "&:hover": {
                          borderRadius: "12px",
                          borderTopRightRadius: "0",
                          borderEndEndRadius: "0"
                        },
                        "& fieldset": {
                          borderRadius: "12px",
                          borderTopRightRadius: "0",
                          borderEndEndRadius: "0"
                        }
                      }
                    }
                  }
                  fullWidth
                  placeholder={placeHolder}
                   color={color} 
                   className={`${className}`}
                  />
    </div>
  )
}

export default Input