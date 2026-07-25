import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";

import { loginUser } from "../../api/authApi";
import { login } from "../../features/authSlice";


const LoginForm = () => {

    const dispatch = useDispatch();
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

            const response = await loginUser(data);

            dispatch(login(response.data.user));

            navigate("/");

        } catch (error) {

            alert(error.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-5"
        >

            <h2 className="text-3xl font-bold text-center">
                Login
            </h2>

            <div>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-md p-3"
                    {...register("email", {
                        required: "Email is required",
                    })}
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}

            </div>

            <div>

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border rounded-md p-3"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />

                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}

            </div>

            <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
            >
                {loading ? "Logging..." : "Login"}
            </button>
            <div className="text-center pt-2">
    <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
        >
            Register
        </Link>
    </p>
</div>

        </form>

    );
};

export default LoginForm;