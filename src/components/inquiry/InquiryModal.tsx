/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
// Path: src/components/inquiry/InquiryModal.tsx

import React, {
    useState, useEffect, useCallback, useMemo,
} from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
// import ReCAPTCHA from 'react-google-recaptcha';
import ReCAPTCHA from 'react-google-recaptcha';
import AsyncAction from '~/components/shared/AsyncAction';
import CurrencyFormat from '~/components/shared/CurrencyFormat';
import { Compare16Svg, Cross12Svg, Wishlist16Svg } from '~/svg';
import { useCompareAddItem } from '~/store/compare/compareHooks';
import { useInquire, useInquireClose } from '~/store/inquire/inquireHooks';
import { useWishlistAddItem } from '~/store/wishlist/wishlistHooks';
import ProductGallery from '~/components/shop/ProductGallery';

interface Country {
    name: string;
    code: string;
    callingCode: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    country: string;
    email: string;
    phoneNumber: string;
    comments: string;
}

function InquiryModal() {
    const inquire = useInquire();
    const inquireClose = useInquireClose();
    const wishlistAddItem = useWishlistAddItem();
    const compareAddItem = useCompareAddItem();
    const { product } = inquire;
    const image = useMemo(() => product?.images || [], [product]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => {
                const formattedCountries = data.map((country: any) => ({
                    name: country.name.common,
                    code: country.cca2,
                }));
                formattedCountries.sort((a: Country, b: Country) => a.name.localeCompare(b.name));
                setCountries(formattedCountries);
            });
    }, []);

    const toggle = useCallback(() => {
        if (inquire.open) {
            inquireClose();
        }
    }, [inquire.open, inquireClose]);

    if (!product) {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (data: FormData) => {
        // Handle form submission
        // console.log(data);
        reset();
    };

    const productTemplate = (
        <div className="quickview__product d-flex flex-column flex-lg-row">
            <div className="quickview__body">
                <ProductGallery className="quickview__gallery" layout="quickview" images={image} />
            </div>
            <div className="w-100 flex mt-lg-5">
                <div className="quickview__product-name text-center">
                    {product.name}
                </div>
                <div className="quickview__product-meta d-flex justify-content-center align-items-center mb-lg-5">
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <FormattedMessage id="TABLE_SKU" />
                                </th>
                                <td>{product.sku}</td>
                            </tr>
                            {product.brand && (
                                <React.Fragment>
                                    <tr>
                                        <th>
                                            <FormattedMessage id="TABLE_BRAND" />
                                        </th>
                                        <td>
                                            {product.brand.name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <FormattedMessage id="TABLE_COUNTRY" />
                                        </th>
                                        <td>
                                            <FormattedMessage
                                                id={`COUNTRY_NAME_${product.brand.country}`}
                                            />
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )}
                            <tr>
                                <th>
                                    <FormattedMessage id="TABLE_PART_NUMBER" />
                                </th>
                                <td>{product.partNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {product.excerpt && (
                    <div className="quickview__product-description">
                        {product.excerpt}
                    </div>
                )}
                <div className="d-flex justify-content-lg-between align-items-center w-100 justify-content-around flex-row mt-lg-5 pb-lg-5">
                    <div className="quickview__product-actions d-flex flex-row">
                        <AsyncAction
                            action={() => wishlistAddItem(product)}
                            render={({ run, loading }) => (
                                <div
                                    className="quickview__product-actions-item quickview__product-actions-item--wishlist"
                                >
                                    <button
                                        type="button"
                                        className={classNames('btn btn-muted btn-icon', {
                                            'btn-loading': loading,
                                        })}
                                        onClick={run}
                                    >
                                        <Wishlist16Svg />
                                    </button>
                                </div>
                            )}
                        />

                        <AsyncAction
                            action={() => compareAddItem(product)}
                            render={({ run, loading }) => (
                                <div
                                    className="quickview__product-actions-item quickview__product-actions-item--compare"
                                >
                                    <button
                                        type="button"
                                        className={classNames('btn btn-muted btn-icon', {
                                            'btn-loading': loading,
                                        })}
                                        onClick={run}
                                    >
                                        <Compare16Svg />
                                    </button>
                                </div>
                            )}
                        />
                    </div>
                    <div className="quickview__product-prices-stock mt-3 pt-0 pt-lg-3 mt-lg-0">
                        <div className="quickview__product-prices">
                            {product.compareAtPrice !== null && (
                                <React.Fragment>
                                    <div className="quickview__product-price quickview__product-price--old">
                                        <CurrencyFormat value={product.compareAtPrice} />
                                    </div>
                                    <div className="quickview__product-price quickview__product-price--new">
                                        <CurrencyFormat value={product.price} />
                                    </div>
                                </React.Fragment>
                            )}
                            {product.compareAtPrice === null && (
                                <div className="quickview__product-price quickview__product-price--current">
                                    <CurrencyFormat value={product.price} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // @ts-ignore
    // @ts-ignore
    return (
        <Modal isOpen={inquire.open} toggle={toggle} centered className="quickview">
            <button type="button" className="quickview__close" onClick={inquireClose}>
                <Cross12Svg />
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="quickview__body d-flex flex-column">
                {productTemplate}

                {/* First Name */}
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        id="firstName"
                        {...register('firstName', { required: 'First Name is required' })}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                </div>

                {/* Last Name */}
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        id="lastName"
                        {...register('lastName', { required: 'Last Name is required' })}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                </div>

                {/* Country Selector */}
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                        className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                        id="country"
                        {...register('country', { required: 'Country is required' })}
                    >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                    {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                {/* Phone Number with Country Code Selector */}
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                            id="phoneNumber"
                            {...register('phoneNumber', {
                                required: 'Phone Number is required',
                                pattern: {
                                    value: /^[+]*[(]?[0-9]{1,3}[)]?[-\s./0-9]*$/g,
                                    message: 'Invalid phone number',
                                },
                            })}
                        />
                    </div>
                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}
                </div>
                {/* Comments Text Area */}
                <div className="form-group">
                    <label htmlFor="comments">Comments</label>
                    <textarea
                        className={`form-control ${errors.comments ? 'is-invalid' : ''}`}
                        id="comments"
                        {...register('comments', { required: 'Comments are required' })}
                    />
                    {errors.comments && <div className="invalid-feedback">{errors.comments.message}</div>}
                </div>
                <div className="d-flex flex-lg-row flex-column w-100">
                    <div className="form-group w-100">
                        <ReCAPTCHA
                            sitekey="YOUR_RECAPTCHA_SITE_KEY"
                            {...register('recaptcha', {
                                required: 'reCAPTCHA validation is required',
                            })}
                        />
                        {errors.recaptcha && <div className="invalid-feedback">{errors.recaptcha.message}</div>}
                    </div>
                    {/* check boxes two */}
                    <div className="w-100">
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="prexInspection"
                                    {...register('prexInspection', { required: 'Please check the box' })}
                                />
                                <label className="custom-control-label" htmlFor="prexInspection">
                                    Pre-export Inspection
                                </label>
                                {errors.prexInspection && <div className="invalid-feedback">{errors.prexInspection.message}</div>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="marineInsurance"
                                    {...register('marineInsurance', { required: 'Please check the box' })}
                                />
                                <label className="custom-control-label" htmlFor="marineInsurance">
                                    Marine Insurance Fee
                                </label>
                                {errors.marineInsurance && <div className="invalid-feedback">{errors.marineInsurance.message}</div>}
                            </div>
                        </div>
                    </div>

                </div>
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Modal>
    );
}

export default InquiryModal;