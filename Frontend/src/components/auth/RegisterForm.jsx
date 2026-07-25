import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../../api/authApi";

const RegisterForm = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        setLoading(true);

        try {

            await registerUser(data);

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            alert(error.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
        >

            <h2 className="text-3xl font-bold text-center">
                Register
            </h2>

            <input
                type="text"
                placeholder="Username"
                className="w-full border rounded p-3"
                {...register("username", {
                    required: "Username is required",
                })}
            />

            {errors.username && (
                <p className="text-red-500 text-sm">
                    {errors.username.message}
                </p>
            )}

            <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded p-3"
                {...register("fullName", {
                    required: "Full Name is required",
                })}
            />

            {errors.fullName && (
                <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                </p>
            )}

            <input
                type="email"
                placeholder="Email"
                className="w-full border rounded p-3"
                {...register("email", {
                    required: "Email is required",
                })}
            />

            {errors.email && (
                <p className="text-red-500 text-sm">
                    {errors.email.message}
                </p>
            )}

            <textarea
                placeholder="Bio (Optional)"
                className="w-full border rounded p-3"
                {...register("bio")}
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full border rounded p-3"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                    },
                })}
            />

            {errors.password && (
                <p className="text-red-500 text-sm">
                    {errors.password.message}
                </p>
            )}

            <button
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
            >
                {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center">

                Already have an account?

                <Link
                    to="/login"
                    className="text-blue-600 ml-2"
                >
                    Login
                </Link>

            </p>

        </form>

    );

};

export default RegisterForm;