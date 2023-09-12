import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const registerSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup.string().required("Password is required"),
});
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values))
        .unwrap()
        .then(() => {
          alert('Registration successful. Please log in to proceed.');
          navigate('/login');
        })
        .catch((error) => {
          console.error('Registration failed:', error);
        });
    },
  });

  return (
    <div className="flex items-center pt-20 max-w-md mx-auto lg:w-2/6">
      <div className="flex-1">
        <div className="text-center">
          <h2 className=" text-lg md:text-2xl lg:text-4xl font-bold uppercase text-gray-700">
            Register
          </h2>
        </div>
        <div className="mt-8 px-6">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange("firstName")}
                onBlur={formik.handleBlur("firstName")}
                placeholder="First Name"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shodow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <div>
                {formik.errors.firstName && formik.touched.firstName ? (
                  <p className="text-red-500 text-xs italic mt-2">
                    {formik.errors.firstName}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-6">
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange("lastName")}
                onBlur={formik.handleBlur("lastName")}
                placeholder="Last Name"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shodow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <div>
                {formik.errors.lastName && formik.touched.lastName ? (
                  <p className="text-red-500 text-xs italic mt-2">
                    {formik.errors.lastName}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-6">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                placeholder="example@example.com"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shodow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <div>
                {formik.errors.email && formik.touched.email ? (
                  <p className="text-red-500 text-xs italic mt-2">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-6">
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                placeholder="Your Password"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shodow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <div>
                {formik.errors.password && formik.touched.password ? (
                  <p className="text-red-500 text-xs italic mt-2">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Register
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 focus:outline-none focus:underline hover:underline"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
