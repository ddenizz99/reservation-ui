import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { authLogin } from "../../services/AuthService";
import { useFormik, ErrorMessage  } from "formik";
import { LoginSchema } from "../../utils/validations";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authStore";
import { toast } from 'react-toastify';

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [alertType, setAlertType] = useState('danger');
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const notifySuccess = () => toast.success('Başarılı bildirim!');
  
  const { handleSubmit, handleChange, values, touched, errors, dirty, isSubmitting } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setError('');
      setIsLoading(true);
      try {
        let result = await authLogin(values.email, values.password);
        setAlertType('success');
        toast.success('Giriş başarılı.');
        dispatch(login(result.decodedToken));
        navigate('/');
      } catch (error) {
        setIsLoading(false);
        setError(error.response.data.messages.error);
      }
    }
  })

  const clickHandle = (event) => {
    event.preventDefault();
      if ($('#show_hide_password input').attr("type") == "text") {
        $('#show_hide_password input').attr('type', 'password');
        $('#show_hide_password i').addClass("bx-hide");
        $('#show_hide_password i').removeClass("bx-show");
      } else if ($('#show_hide_password input').attr("type") == "password") {
        $('#show_hide_password input').attr('type', 'text');
        $('#show_hide_password i').removeClass("bx-hide");
        $('#show_hide_password i').addClass("bx-show");
      }
  }

  return (
    <div>
      {/* wrapper */}
      <div className="wrapper">
        <div className="section-authentication-login d-flex align-items-center justify-content-center mt-4">
          <div className="row">
            <div className="col-12 col-lg-8 mx-auto">
              <div className="card radius-15 overflow-hidden">
                <div className="row g-0">
                  <div className="col-xl-6">
                    <div className="card-body p-5">
                      <div className="text-center">
                        <img src="/assets/images/logo-icon.png" width={80} />
                        <h3 className="mt-4 font-weight-bold">Rezervasyon UI</h3>
                      </div>
                      <div>
                        <div className="form-body">
                          <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-12">
                              <label htmlFor="inputEmailAddress" className="form-label">E-posta</label>
                              <input type="email" name="email" className="form-control" id="inputEmailAddress" placeholder="E-posta" value={values.email} onChange={handleChange} />
                              {touched.email && errors.email ? (
                                <div className="validation-error-span">{errors.email}</div>
                              ) : null}
                            </div>
                            <div className="col-12">
                              <label htmlFor="inputChoosePasw" className="form-label">Şifre</label>
                              <div className="input-group" id="show_hide_password">
                                <input type="password" name="password" className="form-control border-end-0" id="inputChoosePasw" value={values.password} onChange={handleChange} placeholder="Şifre" /> <a href="#" onClick={clickHandle} className="input-group-text bg-transparent"><i className="bx bx-hide" /></a>
                              </div>
                              {touched.password && errors.password ? (
                                  <div className="validation-error-span">{errors.password}</div>
                                ) : null}
                            </div>
                            <div className="col-md-6">
                              <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" defaultChecked />
                                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Beni Hatırla</label>
                              </div>
                            </div>
                            <div className="col-md-6 text-end">	<a href="authentication-forgot-password.html">Şifremi Unuttum</a>
                            </div>
                            <div className="col-12">
                              <div className="d-grid">
                                <button type="submit" className="btn btn-primary" disabled={!dirty || isSubmitting}>
                                  {isLoading ? (
                                    <div className="d-flex justify-content-center">
                                      <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Yükleniyor...</span>
                                      </div>
                                    </div>
                                  ) : (<><i className="bx bxs-lock-open" />Giriş Yap</>)}
                                  </button>
                              </div>
                            </div>
                            <div className="col-12 text-center">
                              <p>Henüz bir hesabınız yok mu? <a href="#" onClick={notifySuccess}>Kayıt Ol</a></p>
                            </div>
                          </form>
                          {error ? (
                            <div className={'alert alert-' + alertType} role="alert">{error}</div>
                          ) : null}
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 bg-login-color d-flex align-items-center justify-content-center">
                    <img src="/assets/images/login-images/login-frent-img.jpg" className="img-fluid" alt="..." />
                  </div>
                </div>
                {/*end row*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end wrapper */}
      
    </div>
  );
}

export default Login;
  