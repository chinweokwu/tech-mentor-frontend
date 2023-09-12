import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const registerSchema = yup.object({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup.string().required("Password is required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values))
        .unwrap()
        .then(() => {
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    },
  });

  return (
    <div className="flex items-center pt-20 max-w-md mx-auto lg:w-2/6">
      <div className="flex-1">
        <div className="text-center">
          <h2 className=" text-lg md:text-2xl lg:text-4xl font-bold uppercase text-gray-700">
            Login
          </h2>
        </div>
        <div className="mt-8 px-6">
          <form onSubmit={formik.handleSubmit}>
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
                Login
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-400">
            if you do not have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 focus:outline-none focus:underline hover:underline"
            >
              Register Here
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
