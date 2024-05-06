import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

interface Props {}

const CoreTextField: React.FC<Props> = ({ ...props }) => {
    return <TextField {...props} />;
};

export default CoreTextField;
