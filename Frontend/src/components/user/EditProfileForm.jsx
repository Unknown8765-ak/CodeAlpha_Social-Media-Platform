import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { updateProfile } from "../../api/authApi";
import { login } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const EditProfileForm = () => {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
    } = useForm({

        defaultValues: {
            username: user?.username,
            fullName: user?.fullName,
            bio: user?.bio,
        }

    });

    const onSubmit = async (data) => {
    try {

        const formData = new FormData();

        formData.append("username", data.username);
        formData.append("fullName", data.fullName);
        formData.append("bio", data.bio);

        if (data.avatar?.[0]) {
            formData.append("avatar", data.avatar[0]);
        }

        const response = await updateProfile(formData);

        dispatch(login(response.data));

        alert("Profile Updated");

    } catch (error) {
        console.log(error);
        alert(error.message);
    }
};
    

    return (

        <div className="bg-white shadow rounded-xl p-8">

            <h2 className="text-2xl font-bold mb-6">
                Edit Profile
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >

                <div>

                    <label className="block mb-2">
                        Profile Picture
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        {...register("avatar")}
                    />

                </div>

                <div>

                    <label className="block mb-2">
                        Username
                    </label>

                    <input
                        {...register("username")}
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                <div>

                    <label className="block mb-2">
                        Full Name
                    </label>

                    <input
                        {...register("fullName")}
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                <div>

                    <label className="block mb-2">
                        Bio
                    </label>

                    <textarea
                        {...register("bio")}
                        rows="4"
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Save Changes
                </button>

            </form>

        </div>

    );
};

export default EditProfileForm;