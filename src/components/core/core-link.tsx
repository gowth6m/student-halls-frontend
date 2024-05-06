"use client";

import { Link as MuiLink } from "@mui/material";
import Link from "next/link";
import React from "react";

interface Props {
    children?: React.ReactNode;
    href: string;
    fontWeight?: number;
}

const CoreLink: React.FC<Props> = ({ children, fontWeight = 800, href }) => {
    return (
        <MuiLink component={Link} href={href} fontWeight={fontWeight}>
            {children}
        </MuiLink>
    );
};

export default CoreLink;
