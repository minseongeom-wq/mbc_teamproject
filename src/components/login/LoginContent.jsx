import { useState } from 'react';
import loginSilhouette from './assets/figma-asset-1.svg';
import loginNintendoLogo from './assets/figma-asset-2.svg';
import backArrow from './assets/figma-asset-3.svg';
import kakaoIcon from './assets/figma-asset-5.svg';
import kirbyBody from './assets/signup-kirby-body.svg';
import kirbyFaceOne from './assets/signup-kirby-face-1.svg';
import kirbyFaceTwo from './assets/signup-kirby-face-2.svg';
import kirbyFaceThree from './assets/signup-kirby-face-3.svg';
import kirbyCheekOne from './assets/signup-kirby-cheek-1.svg';
import kirbyCheekTwo from './assets/signup-kirby-cheek-2.svg';
import signupNintendoLogo from './assets/signup-nintendo-logo.svg';
import signupHelpIcon from './assets/signup-help.svg';
import signupKakaoIcon from './assets/signup-kakao.svg';
import signupBackArrow from './assets/signup-arrow.svg';
import './login.css';

const initialSignupValues = {
  name: '',
  email: '',
  password: '',
};

export default function LoginContent() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupValues, setSignupValues] = useState(initialSignupValues);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('idle');
  const [verificationNotice, setVerificationNotice] = useState('');
  const [isEmailHelpOpen, setIsEmailHelpOpen] = useState(false);
  const [accountHelpType, setAccountHelpType] = useState(null);
  const [accountHelpValues, setAccountHelpValues] = useState({ name: '', id: '', email: '' });
  const [accountHelpNotice, setAccountHelpNotice] = useState('');
  const [isKakaoSignupOpen, setIsKakaoSignupOpen] = useState(false);
  const [kakaoSignupValues, setKakaoSignupValues] = useState({ account: '', password: '' });
  const [keepKakaoLogin, setKeepKakaoLogin] = useState(false);
  const [kakaoSignupNotice, setKakaoSignupNotice] = useState('');
  const [message, setMessage] = useState('');
  const isSignup = mode === 'signup';

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setIsEmailHelpOpen(false);
    setAccountHelpType(null);
    setIsKakaoSignupOpen(false);
    setMessage('');
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage('이메일과 비밀번호를 모두 입력해 주세요.');
      return;
    }

    setMessage('로그인 기능은 계정 연동 후 이용할 수 있습니다.');
  };

  const handleSignup = (event) => {
    event.preventDefault();

    if (Object.values(signupValues).some((value) => !value.trim())) {
      setMessage('이름, 이메일, 비밀번호를 모두 입력해 주세요.');
      return;
    }

    if (signupValues.password.length < 8 || signupValues.password.length > 16) {
      setMessage('비밀번호는 8~16자로 입력해 주세요.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(signupValues.email)) {
      setMessage('올바른 이메일 주소를 입력해 주세요.');
      return;
    }

    if (verificationStatus === 'idle') {
      setVerificationStatus('sent');
      setVerificationNotice('입력하신 이메일로 인증코드가 발송되었습니다!');
      setMessage('');
      return;
    }

    if (verificationStatus !== 'verified') {
      setMessage('이메일 인증을 완료해 주세요.');
      return;
    }

    setEmail(signupValues.email);
    setPassword('');
    setMode('login');
    setMessage('이메일 인증이 완료되었습니다. 로그인해 주세요.');
  };

  const handleVerification = () => {
    if (!signupValues.name.trim() || !signupValues.email.trim() || !signupValues.password) {
      setVerificationNotice('이름, 이메일, 비밀번호를 먼저 입력해 주세요.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(signupValues.email)) {
      setVerificationNotice('올바른 이메일 주소를 입력해 주세요.');
      return;
    }

    if (signupValues.password.length < 8 || signupValues.password.length > 16) {
      setVerificationNotice('비밀번호는 8~16자로 입력해 주세요.');
      return;
    }

    if (!/^\d{6}$/.test(verificationCode)) {
      setVerificationNotice('이메일로 받은 6자리 인증코드를 입력해 주세요.');
      return;
    }

    setVerificationStatus('verified');
    setVerificationNotice('인증이 완료되었습니다. 로그인으로 이동해 주세요.');
    setMessage('');
  };

  const handleVerificationResend = () => {
    setVerificationCode('');
    setVerificationStatus('sent');
    setVerificationNotice('인증코드가 재전송되었습니다!');
    setMessage('');
  };

  const updateSignupValue = (key, value) => {
    setSignupValues((current) => ({ ...current, [key]: value }));

    if (key === 'email') {
      setVerificationCode('');
      setVerificationStatus('idle');
      setVerificationNotice('');
    }

    setMessage('');
  };

  const showPreparationMessage = (label) => {
    setMessage(`${label} 기능은 준비 중입니다.`);
  };

  const openAccountHelp = (type) => {
    setAccountHelpType(type);
    setAccountHelpValues({ name: '', id: '', email: '' });
    setAccountHelpNotice('');
  };

  const closeAccountHelp = () => {
    setAccountHelpType(null);
    setAccountHelpNotice('');
  };

  const handleAccountHelp = (event) => {
    event.preventDefault();
    const requiredValue = accountHelpType === 'id' ? accountHelpValues.name : accountHelpValues.id;

    if (!requiredValue.trim() || !accountHelpValues.email.trim()) {
      setAccountHelpNotice('모든 정보를 입력해 주세요.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(accountHelpValues.email)) {
      setAccountHelpNotice('올바른 이메일 주소를 입력해 주세요.');
      return;
    }

    setAccountHelpNotice(
      accountHelpType === 'id'
        ? '가입된 아이디 정보를 이메일로 안내했습니다.'
        : '비밀번호 재설정 안내를 이메일로 발송했습니다.',
    );
  };

  const updateAccountHelpValue = (key, value) => {
    setAccountHelpValues((current) => ({ ...current, [key]: value }));
    setAccountHelpNotice('');
  };

  const handleKakaoSignup = (event) => {
    event.preventDefault();

    if (!kakaoSignupValues.account.trim() || !kakaoSignupValues.password) {
      setKakaoSignupNotice('카카오 계정과 비밀번호를 모두 입력해 주세요.');
      return;
    }

    setKakaoSignupNotice('카카오 계정 확인 후 빠른 회원가입을 진행합니다.');
  };

  return (
    <section
      className={`login-content${isSignup ? ' is-signup' : ''}`}
      aria-labelledby="login-page-title"
    >
      <h1 id="login-page-title" className="login-content__sr-only">
        {isSignup ? '회원가입' : '로그인'}
      </h1>

      <button
        className="login-content__back"
        type="button"
        aria-label={isSignup ? '로그인 화면으로 전환' : '회원가입 화면으로 전환'}
        onClick={() => changeMode(isSignup ? 'login' : 'signup')}
      >
        <img src={isSignup ? signupBackArrow : backArrow} alt="" />
      </button>

      <div className="login-card">
        <section
          className="login-card__form-pane login-card__form-pane--signup"
          aria-label="닌텐도 계정 회원가입"
          aria-hidden={!isSignup}
        >
          <form className="signup-form" onSubmit={handleSignup} noValidate>
            <div className="signup-form__heading">
              <img src={signupNintendoLogo} alt="Nintendo" />
              <p>Sign up</p>
            </div>

            <div className="signup-form__fields">
              <label className="signup-form__field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={signupValues.name}
                  placeholder="이름을 입력해주세요"
                  autoComplete="name"
                  disabled={!isSignup}
                  onChange={(event) => updateSignupValue('name', event.target.value)}
                />
              </label>
              <label className="signup-form__field">
                <span>Email</span>
                <input
                  type="email"
                  name="signup-email"
                  value={signupValues.email}
                  placeholder="이메일을 입력하세요"
                  autoComplete="email"
                  disabled={!isSignup}
                  onChange={(event) => updateSignupValue('email', event.target.value)}
                />
              </label>
              <label className="signup-form__field">
                <span>Password</span>
                <input
                  type="password"
                  name="signup-password"
                  value={signupValues.password}
                  placeholder="8~16자/문자, 숫자, 특수 문자 모두 혼용"
                  autoComplete="new-password"
                  minLength="8"
                  maxLength="16"
                  disabled={!isSignup}
                  onChange={(event) => updateSignupValue('password', event.target.value)}
                />
              </label>

              {verificationStatus !== 'idle' && (
                <div className="signup-form__verification">
                  <div className="signup-form__verification-row">
                    <label htmlFor="signup-verification-code">Code</label>
                    <input
                      id="signup-verification-code"
                      type="text"
                      name="verification-code"
                      value={verificationCode}
                      placeholder="6자리 인증코드"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="one-time-code"
                      maxLength="6"
                      disabled={!isSignup || verificationStatus === 'verified'}
                      onKeyDown={(event) => {
                        const editingKeys = [
                          'Backspace',
                          'Delete',
                          'Tab',
                          'ArrowLeft',
                          'ArrowRight',
                          'Home',
                          'End',
                        ];

                        if (!/^\d$/.test(event.key) && !editingKeys.includes(event.key) && !event.ctrlKey && !event.metaKey) {
                          event.preventDefault();
                        }
                      }}
                      onChange={(event) => {
                        setVerificationCode(event.target.value.replace(/\D/g, ''));
                        setVerificationNotice('입력하신 이메일로 인증코드가 발송되었습니다!');
                      }}
                    />
                    <div className="signup-form__verification-actions">
                      <button
                        className="signup-form__verify-button"
                        type="button"
                        disabled={!isSignup || verificationStatus === 'verified'}
                        onClick={handleVerification}
                      >
                        {verificationStatus === 'sent' ? '인증하기' : '인증완료'}
                      </button>
                      {verificationStatus === 'sent' && (
                        <button
                          className="signup-form__resend-button"
                          type="button"
                          disabled={!isSignup}
                          onClick={handleVerificationResend}
                        >
                          재전송
                        </button>
                      )}
                    </div>
                  </div>
                  <p
                    className={`signup-form__verification-notice${verificationStatus === 'verified' ? ' is-verified' : ''}`}
                    aria-live="polite"
                  >
                    {verificationNotice}
                  </p>
                </div>
              )}
            </div>

            <button className="signup-form__submit" type="submit" disabled={!isSignup}>
              회원가입
            </button>

            <button
              className="signup-form__help"
              type="button"
              disabled={!isSignup}
              onClick={() => setIsEmailHelpOpen(true)}
            >
              <img src={signupHelpIcon} alt="" />
              <span>이메일이 도착하지 않았나요?</span>
            </button>

            <button
              className="signup-form__kakao"
              type="button"
              aria-label="카카오 계정으로 회원가입"
              disabled={!isSignup}
              onClick={() => {
                setKakaoSignupValues({ account: '', password: '' });
                setKeepKakaoLogin(false);
                setKakaoSignupNotice('');
                setIsKakaoSignupOpen(true);
              }}
            >
              <img src={signupKakaoIcon} alt="" />
            </button>
          </form>
        </section>

        <section
          className="login-card__form-pane login-card__form-pane--login"
          aria-label="닌텐도 계정 로그인"
          aria-hidden={isSignup}
        >
          <form className="login-form" onSubmit={handleLogin} noValidate>
            <div className="login-form__heading">
              <img src={loginNintendoLogo} alt="Nintendo" />
              <p>Welcome Nintendo!</p>
            </div>

            <div className="login-form__fields">
              <label className="login-form__field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="super@gmail.com"
                  autoComplete="email"
                  disabled={isSignup}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setMessage('');
                  }}
                />
              </label>
              <label className="login-form__field">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  autoComplete="current-password"
                  disabled={isSignup}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setMessage('');
                  }}
                />
              </label>
            </div>

            <button className="login-form__submit" type="submit" disabled={isSignup}>
              로그인
            </button>

            <div className="login-form__help" aria-label="계정 찾기">
              <button
                type="button"
                disabled={isSignup}
                onClick={() => openAccountHelp('id')}
              >
                아이디를 잊으셨나요?
              </button>
              <button
                type="button"
                disabled={isSignup}
                onClick={() => openAccountHelp('password')}
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>

            <button
              className="login-form__kakao"
              type="button"
              aria-label="카카오 계정으로 로그인"
              disabled={isSignup}
              onClick={() => showPreparationMessage('카카오 로그인')}
            >
              <img src={kakaoIcon} alt="" />
            </button>
          </form>
        </section>

        <section className="login-promo" aria-live="polite">
          <div className="login-promo__visual login-promo__visual--login" aria-hidden={isSignup}>
            <img className="login-promo__inkling" src={loginSilhouette} alt="" />
          </div>

          <div className="login-promo__visual login-promo__visual--signup" aria-hidden={!isSignup}>
            <div className="login-promo__kirby-scene">
              <div className="login-promo__kirby">
                <img className="login-promo__kirby-body" src={kirbyBody} alt="" />
                <img className="login-promo__kirby-face-one" src={kirbyFaceOne} alt="" />
                <img className="login-promo__kirby-face-two" src={kirbyFaceTwo} alt="" />
                <img className="login-promo__kirby-face-three" src={kirbyFaceThree} alt="" />
                <img className="login-promo__kirby-cheek-one" src={kirbyCheekOne} alt="" />
                <img className="login-promo__kirby-cheek-two" src={kirbyCheekTwo} alt="" />
              </div>
            </div>
          </div>

          <div className="login-promo__copy login-promo__copy--login" aria-hidden={isSignup}>
            <h2>닌텐도는 처음이신가요?</h2>
            <p>계정을 만들고 닌텐도의 세계로 떠나보세요!</p>
            <button type="button" onClick={() => changeMode('signup')}>
              회원가입
            </button>
          </div>

          <div className="login-promo__copy login-promo__copy--signup" aria-hidden={!isSignup}>
            <h2>돌아온 걸 환영해요!</h2>
            <p>기다리고 있었어요!</p>
            <button type="button" onClick={() => changeMode('login')}>
              로그인
            </button>
          </div>
        </section>

        <p className="login-card__message" aria-live="polite">{message}</p>

        {isEmailHelpOpen && (
          <div
            className="login-email-help"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsEmailHelpOpen(false);
              }
            }}
          >
            <section
              className="login-email-help__dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="email-help-title"
            >
              <button
                className="login-email-help__close"
                type="button"
                aria-label="안내창 닫기"
                onClick={() => setIsEmailHelpOpen(false)}
              >
                ×
              </button>
              <p className="login-email-help__eyebrow">EMAIL VERIFICATION</p>
              <h2 id="email-help-title">인증 메일이 도착하지 않았나요?</h2>
              <p className="login-email-help__description">
                메일이 도착하기까지 잠시 시간이 걸릴 수 있습니다. 아래 내용을 순서대로 확인해 주세요.
              </p>
              <ul>
                <li>입력한 이메일 주소가 정확한지 확인해 주세요.</li>
                <li>스팸함 또는 프로모션함을 확인해 주세요.</li>
                <li>잠시 기다린 뒤 인증코드 재전송을 이용해 주세요.</li>
              </ul>
              {signupValues.email && (
                <p className="login-email-help__address">발송 주소: {signupValues.email}</p>
              )}
              <button
                className="login-email-help__confirm"
                type="button"
                onClick={() => setIsEmailHelpOpen(false)}
              >
                확인했습니다
              </button>
            </section>
          </div>
        )}

        {accountHelpType && (
          <div
            className="login-email-help login-account-help"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeAccountHelp();
              }
            }}
          >
            <section
              className="login-email-help__dialog login-account-help__dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="account-help-title"
            >
              <button
                className="login-email-help__close"
                type="button"
                aria-label="계정 찾기 창 닫기"
                onClick={closeAccountHelp}
              >
                ×
              </button>
              <p className="login-email-help__eyebrow">
                {accountHelpType === 'id' ? 'FIND YOUR ID' : 'RESET PASSWORD'}
              </p>
              <h2 id="account-help-title">
                {accountHelpType === 'id' ? '아이디를 잊으셨나요?' : '비밀번호를 잊으셨나요?'}
              </h2>
              <p className="login-email-help__description">
                {accountHelpType === 'id'
                  ? '가입할 때 사용한 이름과 이메일을 입력해 주세요.'
                  : '가입한 아이디와 이메일을 입력해 주세요.'}
              </p>

              <form className="login-account-help__form" onSubmit={handleAccountHelp} noValidate>
                {accountHelpType === 'id' ? (
                  <label>
                    <span>Name</span>
                    <input
                      type="text"
                      value={accountHelpValues.name}
                      placeholder="이름을 입력해 주세요"
                      autoComplete="name"
                      onChange={(event) => updateAccountHelpValue('name', event.target.value)}
                    />
                  </label>
                ) : (
                  <label>
                    <span>ID</span>
                    <input
                      type="text"
                      value={accountHelpValues.id}
                      placeholder="아이디를 입력해 주세요"
                      autoComplete="username"
                      onChange={(event) => updateAccountHelpValue('id', event.target.value)}
                    />
                  </label>
                )}

                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    value={accountHelpValues.email}
                    placeholder="이메일을 입력해 주세요"
                    autoComplete="email"
                    onChange={(event) => updateAccountHelpValue('email', event.target.value)}
                  />
                </label>

                <p className="login-account-help__notice" aria-live="polite">
                  {accountHelpNotice}
                </p>
                <button className="login-email-help__confirm" type="submit">
                  {accountHelpType === 'id' ? '아이디 찾기' : '재설정 메일 받기'}
                </button>
              </form>
            </section>
          </div>
        )}

        {isKakaoSignupOpen && (
          <div
            className="login-email-help login-kakao-help"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsKakaoSignupOpen(false);
              }
            }}
          >
            <section
              className="login-email-help__dialog login-kakao-help__dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="kakao-signup-title"
            >
              <button
                className="login-email-help__close"
                type="button"
                aria-label="카카오 회원가입 안내창 닫기"
                onClick={() => setIsKakaoSignupOpen(false)}
              >
                ×
              </button>

              <header className="login-kakao-help__header">
                <h2 id="kakao-signup-title">kakao</h2>
              </header>

              <form className="login-kakao-help__form" onSubmit={handleKakaoSignup} noValidate>
                <label className="login-kakao-help__field">
                  <span>카카오메일 아이디, 이메일, 전화번호</span>
                  <input
                    type="text"
                    value={kakaoSignupValues.account}
                    autoComplete="username"
                    aria-label="카카오 계정"
                    onChange={(event) => {
                      setKakaoSignupValues((current) => ({ ...current, account: event.target.value }));
                      setKakaoSignupNotice('');
                    }}
                  />
                </label>
                <p className="login-kakao-help__tip">
                  <strong>TIP</strong> 카카오메일이 없다면 메일 아이디만 입력해 보세요.
                </p>

                <label className="login-kakao-help__field">
                  <span>비밀번호</span>
                  <input
                    type="password"
                    value={kakaoSignupValues.password}
                    autoComplete="current-password"
                    aria-label="카카오 비밀번호"
                    onChange={(event) => {
                      setKakaoSignupValues((current) => ({ ...current, password: event.target.value }));
                      setKakaoSignupNotice('');
                    }}
                  />
                </label>

                <label className="login-kakao-help__keep">
                  <input
                    type="checkbox"
                    checked={keepKakaoLogin}
                    onChange={(event) => setKeepKakaoLogin(event.target.checked)}
                  />
                  <span>로그인 상태 유지</span>
                  <i aria-label="로그인 상태 유지 안내">i</i>
                </label>

                <p className="login-kakao-help__notice" aria-live="polite">
                  {kakaoSignupNotice}
                </p>
                <button className="login-kakao-help__login" type="submit">로그인</button>
              </form>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
