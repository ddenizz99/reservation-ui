import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import $ from "jquery";
import AuthService from "../../services/AuthService";

function Login() {

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const authService = new AuthService();

  const loginHandle = async(e) => {
    e.preventDefault();
    setUser({
      id: 1,
      userName: 'ddenizz99'
    })
    navigate('/');
    //let authService = AuthService();
    /* let result = await authService.login("egedeniz14400@gmail.com", "Ege1q2w3e");
    await console.log(result); */
  }

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
                          <form className="row g-3">
                            <div className="col-12">
                              <label htmlFor="inputEmailAddress" className="form-label">E-posta</label>
                              <input type="email" className="form-control" id="inputEmailAddress" placeholder="E-posta" />
                            </div>
                            <div className="col-12">
                              <label htmlFor="inputChoosePassword" className="form-label">Şifre</label>
                              <div className="input-group" id="show_hide_password">
                                <input type="password" className="form-control border-end-0" id="inputChoosePassword" defaultValue={12345678} placeholder="Şifre" /> <a href="#" onClick={clickHandle} className="input-group-text bg-transparent"><i className="bx bx-hide" /></a>
                              </div>
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
                                <button onClick={loginHandle} className="btn btn-primary"><i className="bx bxs-lock-open" />Giriş Yap</button>
                              </div>
                            </div>
                            <div className="col-12 text-center">
                              <p>Henüz bir hesabınız yok mu? <a href="authentication-signup.html">Kayıt Ol</a></p>
                            </div>
                          </form>
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
  