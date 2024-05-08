"use client";

import {
    Box,
    Dialog,
    DialogContent,
    DialogProps,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import CoreButton from "../core/core-button";
import CoreLink from "../core/core-link";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import ApiClient from "@/services/api-client";
import { useAuth } from "@/context/auth-provider";
import toast from "react-hot-toast";
import CoreIcon from "../core/core-icon";
import LoadingTopbar from "../core/loading-topbar";

// ------------------------------------------------------------

interface Props extends DialogProps {}

const RegisterDialog: React.FC<Props> = ({
    open,
    onClose,
    TransitionComponent,
    ...otherProps
}) => {
    const pathname = usePathname();
    const router = useRouter();
    const { setToken } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const allUniversitiesQuery = useQuery({
        queryKey: ["allUniversities"],
        queryFn: async () => {
            return ApiClient.university.allUniversities();
        },
    });

    /**
     * Formik form
     * - email
     * - password
     */
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            username: "",
            firstname: "",
            lastname: "",
            passwordConfirm: "",
            university: "",
            yearOfStudy: "",
        },
        onSubmit: (values) => {
            console.log(values);
            const payload = {
                username: values.username,
                email: values.email,
                password: values.password,
                firstName: values.firstname,
                lastName: values.lastname,
                university: values.university,
                yearOfStudy: parseInt(values.yearOfStudy),
            };
            registerMutation.mutate(payload);
        },
    });

    /**
     * Login mutation
     * - onSuccess: set token and redirect to current page
     * - onError: show error toast
     * - onMutate: show loading spinner
     */
    const registerMutation = useMutation({
        mutationFn: async (form: {
            username: string;
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            university: string;
            yearOfStudy: number;
        }) => {
            return ApiClient.user.register(form);
        },
        onSuccess: (res) => {
            setToken(res.data.data?.token);
            onClose;
            router.push(`${pathname}?view=login`);
            toast.success("Successfully registered");
        },
        onError: (_error) => {
            toast.error("Error registering");
        },
    });

    /**
     * Render
     */
    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionComponent}
            fullWidth
            maxWidth="xs"
            {...otherProps}
        >
            {(registerMutation.isLoading || allUniversitiesQuery.isLoading) && (
                <LoadingTopbar />
            )}
            <DialogContent>
                <Box
                    component={"form"}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        padding: 2,
                    }}
                >
                    <Typography variant="h4">Register</Typography>

                    <TextField
                        name={"email"}
                        label={"Email"}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />

                    <TextField
                        name={"username"}
                        label={"Username"}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />

                    <TextField
                        name={"password"}
                        label={"Password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                >
                                    {showPassword ? (
                                        <CoreIcon.Eye fontSize="small" />
                                    ) : (
                                        <CoreIcon.EyeSlash fontSize="small" />
                                    )}
                                </IconButton>
                            ),
                        }}
                    />

                    <TextField
                        name={"passwordConfirm"}
                        label={"Confirm Password"}
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                >
                                    {showPassword ? (
                                        <CoreIcon.Eye fontSize="small" />
                                    ) : (
                                        <CoreIcon.EyeSlash fontSize="small" />
                                    )}
                                </IconButton>
                            ),
                        }}
                    />

                    <TextField
                        name={"firstname"}
                        label={"First Name"}
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                    />

                    <TextField
                        name={"lastname"}
                        label={"Last Name"}
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                    />

                    <TextField
                        name={"yearOfStudy"}
                        label={"Year of study"}
                        value={formik.values.yearOfStudy}
                        onChange={formik.handleChange}
                    />

                    <FormControl>
                        <InputLabel id="uni-select">University</InputLabel>
                        <Select
                            name={"university"}
                            value={formik.values.university}
                            onChange={formik.handleChange}
                            labelId="uni-select"
                            label="University"
                            sx={{
                                width: 300,
                            }}
                        >
                            {allUniversitiesQuery.data?.data?.data?.map(
                                (uni) => (
                                    <MenuItem key={uni.id} value={uni.id}>
                                        {uni.name}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>

                    <CoreButton
                        buttonVariant="primary"
                        fixedWidth
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >
                        Continue
                    </CoreButton>

                    <Typography variant="body2" textAlign={"center"}>
                        {`By signing up, you agree to our `}{" "}
                        <CoreLink href={`/terms`}>Terms of Service</CoreLink>
                        <br />
                        <CoreLink href={`/privacy`}>Privacy Policy.</CoreLink>
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterDialog;
