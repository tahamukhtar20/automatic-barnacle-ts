// react
import React, { useEffect } from 'react';
// third-party
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
// application
import { toast } from 'react-toastify';
import AppLink from '~/components/shared/AppLink';
import BlockSpace from '~/components/blocks/BlockSpace';
import Checkbox from '~/components/shared/Checkbox';
import PageTitle from '~/components/shared/PageTitle';
import Redirect from '~/components/shared/Redirect';
import url from '~/api/services/url';
import { useSignInForm } from '~/api/services/forms/sign-in';
import { useSignUpForm } from '~/api/services/forms/sign-up';
import { useUser } from '~/store/user/userHooks';
import { validateEmail, validateUserName } from '~/api/services/validators';
import { globalIntl } from '~/api/services/i18n/global-intl';
import { AuthService, VehicleService } from '~/api/services/allapi';

function Page() {
    const intl = useIntl();
    const user = useUser();
    const signInForm = useSignInForm();
    const signUpForm = useSignUpForm();

    if (user) {
        return <Redirect href={url.accountDashboard()} />;
    }

    const { ref: signInFormRememberMeRef, ...signInFormRememberMeRefProps } = signInForm.register('remember');
    // setup a watch from react hook form for the email
    function handleForgotPassowrd() {
        // if email is empty ask to enter email
        const email = signInForm.watch('email');
        // email should follow a regex
        if (!email || email === 'red-parts@example.com') {
            toast.error('Please enter email');
            return;
        }
        if (!validateEmail(email)) {
            toast.error('Please enter valid email');
            return;
        }
        AuthService.passwordForgot({ requestBody: { email: signInForm.watch('email') } })
            .then((res) => {
                toast.success('Password Reset Email sent successfully');
            });
    }

    return (
        <React.Fragment>
            <PageTitle>{intl.formatMessage({ id: 'HEADER_LOGIN' })}</PageTitle>

            <BlockSpace layout="after-header" />

            <div className="block">
                <div className="container container--max--lg">
                    <div className="row">
                        <div className="col-md-6 d-flex">
                            <div className="card flex-grow-1 mb-md-0 mr-0 mr-lg-3 ml-0 ml-lg-4">
                                <div className="card-body card-body--padding--2">
                                    <h3 className="card-title">
                                        <FormattedMessage id="HEADER_LOGIN" />
                                    </h3>
                                    <form onSubmit={signInForm.submit}>
                                        {signInForm.serverError && (
                                            <div className="alert alert-sm alert-danger">
                                                <FormattedMessage id={signInForm.serverError} />
                                            </div>
                                        )}
                                        <div className="form-group">
                                            <label htmlFor="signin-email">
                                                <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                                            </label>
                                            <input
                                                id="signin-email"
                                                type="email"
                                                className={classNames('form-control', {
                                                    'is-invalid': signInForm.errors.email,
                                                })}
                                                placeholder="customer@example.com"
                                                {...signInForm.register('email', {
                                                    required: true,
                                                    validate: { email: validateEmail },
                                                })}
                                            />
                                            <div className="invalid-feedback">
                                                {signInForm.errors.email?.type === 'required' && (
                                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                                )}
                                                {signInForm.errors.email?.type === 'email' && (
                                                    <FormattedMessage id="ERROR_FORM_INCORRECT_EMAIL" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signin-password">
                                                <FormattedMessage id="INPUT_PASSWORD_LABEL" />
                                            </label>
                                            <input
                                                id="signin-password"
                                                type="password"
                                                className={classNames('form-control', {
                                                    'is-invalid': signInForm.errors.password,
                                                })}
                                                placeholder={intl.formatMessage({ id: 'INPUT_PASSWORD_PLACEHOLDER' })}
                                                {...signInForm.register('password', { required: true })}
                                            />
                                            <div className="invalid-feedback">
                                                {signInForm.errors.password?.type === 'required' && (
                                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                                )}
                                            </div>
                                            <small className="form-text text-muted">
                                                <button className="p-0 btn-link btn" type="button" onClick={handleForgotPassowrd}>
                                                    <FormattedMessage id="LINK_FORGOT_PASSWORD" />
                                                </button>
                                            </small>
                                        </div>
                                        {/* <div className="form-group"> */}
                                        {/*     <div className="form-check"> */}
                                        {/*         <Checkbox */}
                                        {/*             className="form-check-input" */}
                                        {/*             id="sign-in-remember" */}
                                        {/*             inputRef={signInFormRememberMeRef} */}
                                        {/*             {...signInFormRememberMeRefProps} */}
                                        {/*         /> */}
                                        {/*         <label className="form-check-label" htmlFor="sign-in-remember"> */}
                                        {/*             <FormattedMessage id="INPUT_REMEMBER_ME_LABEL" /> */}
                                        {/*         </label> */}
                                        {/*     </div> */}
                                        {/* </div> */}
                                        <div className="form-group mb-0">
                                            <button
                                                type="submit"
                                                className={classNames('btn', 'btn-primary', 'mt-3', {
                                                    'btn-loading': signInForm.submitInProgress,
                                                })}
                                            >
                                                <FormattedMessage id="BUTTON_LOGIN" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex mt-4 mt-md-0">
                            <div className="card flex-grow-1 mb-0 ml-0 ml-lg-3 mr-0 mr-lg-4">
                                <div className="card-body card-body--padding--2">
                                    <h3 className="card-title">
                                        <FormattedMessage id="HEADER_REGISTER" />
                                    </h3>
                                    <form onSubmit={signUpForm.submit}>
                                        {signUpForm.serverError && (
                                            <div className="alert alert-sm alert-danger">
                                                <FormattedMessage id={signUpForm.serverError} />
                                            </div>
                                        )}
                                        <div className="form-group">
                                            <label htmlFor="signup-email">
                                                <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                                            </label>
                                            <input
                                                id="signup-email"
                                                type="email"
                                                className={classNames('form-control', {
                                                    'is-invalid': signUpForm.errors.email,
                                                })}
                                                placeholder="customer@example.com"
                                                {...signUpForm.register('email', {
                                                    required: true,
                                                    validate: { email: validateEmail },
                                                })}
                                            />
                                            <div className="invalid-feedback">
                                                {signUpForm.errors.email?.type === 'required' && (
                                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                                )}
                                                {signUpForm.errors.email?.type === 'email' && (
                                                    <FormattedMessage id="ERROR_FORM_INCORRECT_EMAIL" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signup-username">
                                                <FormattedMessage id="INPUT_USERNAME_LABEL" />
                                            </label>
                                            <input
                                                id="signup-username"
                                                type="text"
                                                className={classNames('form-control', {
                                                    'is-invalid': signUpForm.errors.username,
                                                })}
                                                placeholder="username"
                                                {...signUpForm.register('username', {
                                                    required: true,
                                                    validate: { username: validateUserName },
                                                })}
                                            />
                                            <div className="invalid-feedback">
                                                {signUpForm.errors.username?.type === 'required' && (
                                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="signup-password">
                                                <FormattedMessage id="INPUT_PASSWORD_LABEL" />
                                            </label>
                                            <input
                                                id="signup-password"
                                                type="password"
                                                className={classNames('form-control', {
                                                    'is-invalid': signUpForm.errors.password,
                                                })}
                                                placeholder={intl.formatMessage({ id: 'INPUT_PASSWORD_PLACEHOLDER' })}
                                                {...signUpForm.register('password', {
                                                    required: true,
                                                })}
                                            />
                                            <div className="invalid-feedback">
                                                {signUpForm.errors.password?.type === 'required' && (
                                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signup-confirm">
                                                <FormattedMessage id="INPUT_PASSWORD_REPEAT_LABEL" />
                                            </label>
                                            <input
                                                id="signup-confirm"
                                                type="password"
                                                className={classNames('form-control', {
                                                    'is-invalid': signUpForm.errors.confirmPassword,
                                                })}
                                                placeholder={intl.formatMessage({
                                                    id: 'INPUT_PASSWORD_REPEAT_PLACEHOLDER',
                                                })}
                                                {...signUpForm.register('confirmPassword', {
                                                    required: true,
                                                    validate: {
                                                        match: (value) => value === signUpForm.watch('password'),
                                                    },
                                                })}
                                            />
                                            <div className="invalid-feedback">
                                                {signUpForm.errors.confirmPassword?.type === 'required' && (
                                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                                )}
                                                {signUpForm.errors.confirmPassword?.type === 'match' && (
                                                    <FormattedMessage id="ERROR_FORM_PASSWORD_DOES_NOT_MATCH" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group mb-0">
                                            <button
                                                type="submit"
                                                className={classNames('btn', 'btn-primary', 'mt-3', {
                                                    'btn-loading': signUpForm.submitInProgress,
                                                })}
                                            >
                                                <FormattedMessage id="BUTTON_REGISTER" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
