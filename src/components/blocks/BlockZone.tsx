// react
import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
// third-party
import classNames from 'classnames';
import Slick from 'react-slick';
import { FormattedMessage, useIntl } from 'react-intl';
// application
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import AppSlick, { ISlickProps } from '~/components/shared/AppSlick';
import Arrow from '~/components/shared/Arrow';
import ProductCard, { IProductCardElement } from '~/components/shared/ProductCard';
import url from '~/api/services/url';
import { baseUrl } from '~/api/services/utils';
import { IProduct } from '~/interfaces/product';
import { IShopCategory } from '~/interfaces/category';
import { shopApi } from '~/api';

export interface IBlockZoneTab {
    name: string;
    source: () => Promise<IProduct[]>;
}

interface Props {
    image: string;
    mobileImage: string;
    categorySlug: string;
}

const slickSettings: ISlickProps = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        { breakpoint: 1399, settings: { slidesToShow: 3, slidesToScroll: 3 } },
        { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 459, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
};

const excludeElements: IProductCardElement[] = ['features', 'list-buttons'];

function BlockZone(props: Props) {
    const intl = useIntl();
    const { image, mobileImage, categorySlug } = props;
    const slickRef = useRef<Slick>(null);
    const cancelRequestRef = useRef(() => {});
    const [category, setCategory] = useState<IShopCategory | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTab, setCurrentTab] = useState<IBlockZoneTab | null>(null);
    const subs = category?.children || [];
    const [error, setError] = React.useState(false);

    const errorTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        // Clear the previous timeout if it exists
        if (errorTimeoutRef.current !== null) {
            clearTimeout(errorTimeoutRef.current);
        }

        // Set a new timeout to check if the products array is empty after 4 seconds
        errorTimeoutRef.current = window.setTimeout(() => {
            if (products.length === 0) {
                setError(true);
            } else {
                setError(false);
            }
        }, 6000);

        // Clean up the timeout when the component unmounts or the products array changes
        return () => {
            if (errorTimeoutRef.current !== null) {
                clearTimeout(errorTimeoutRef.current);
            }
        };
    }, [products]);
    const handleNextClick = () => {
        if (slickRef.current) {
            slickRef.current.slickNext();
        }
    };

    const handlePrevClick = () => {
        if (slickRef.current) {
            slickRef.current.slickPrev();
        }
    };

    const tabs: any = useMemo(() => [
        {
            name: 'All',
            source: () => shopApi.getEngineCategories(null, 6),
        },
        {
            name: 'Diesel',
            source: () => shopApi.getEngineCategories('Diesel', 6),
        },
        {
            name: 'Electricity',
            source: () => shopApi.getEngineCategories('Electricity', 6),
        },
        {
            name: 'Gas',
            source: () => shopApi.getEngineCategories('Gas', 6),
        },
        {
            name: 'Petrol',
            source: () => shopApi.getEngineCategories('Petrol', 6),
        },
    ], [intl, categorySlug]);

    const load = (tab: IBlockZoneTab) => {
        cancelRequestRef.current();

        let canceled = false;
        cancelRequestRef.current = () => {
            canceled = true;
        };

        setIsLoading(true);

        tab.source().then((result) => {
            if (canceled) {
                return;
            }

            setIsLoading(false);
            setProducts(result);
        });
    };

    const onTabClick = (tab: IBlockZoneTab) => {
        setCurrentTab(tab);
        load(tab);
    };

    // Unmount.
    useEffect(() => () => {
        cancelRequestRef.current();
    }, []);

    useEffect(() => {
        let canceled = false;

        shopApi.getCategoryBySlug(categorySlug, { depth: 1 }).then((result) => {
            if (canceled) {
                return;
            }

            setCategory(result);
        });

        setCurrentTab(tabs[0]);
        load(tabs[0]);

        return () => {
            canceled = true;
        };
    }, [tabs, categorySlug]);

    if (!category) {
        return null;
    }

    return (
        <div className="block block-zone">
            <div className="container">
                <div className="block-zone__body">
                    <div className="block-zone__card category-card category-card--layout--overlay">
                        <div className="category-card__body">
                            <div className="category-card__overlay-image">
                                <AppImage
                                    srcSet={`${baseUrl(mobileImage)} 530w, ${baseUrl(image)} 305w`}
                                    src={image}
                                    sizes="(max-width: 575px) 530px, 305px"
                                />
                            </div>
                            <div className="category-card__overlay-image category-card__overlay-image--blur">
                                <AppImage
                                    srcSet={`${baseUrl(mobileImage)} 530w, ${baseUrl(image)} 305w`}
                                    src={image}
                                    sizes="(max-width: 575px) 530px, 305px"
                                />
                            </div>
                            <div className="category-card__content">
                                <div className="category-card__info">
                                    <div className="category-card__name">
                                        <AppLink href={url.category(category)}>
                                            {category.name}
                                        </AppLink>
                                    </div>
                                    <ul className="category-card__children">
                                        {subs.map((sub, subIdx) => (
                                            <li key={subIdx}>
                                                <AppLink href={url.productsCustom(sub)}>
                                                    {sub.name}
                                                </AppLink>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="category-card__actions">
                                        <AppLink href={url.prodcutsCustomShopAll()} className="btn btn-primary btn-sm">
                                            <FormattedMessage id="BUTTON_SHOP_ALL" />
                                        </AppLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="block-zone__widget">
                        <div className="block-zone__widget-header">
                            <div className="block-zone__tabs">
                                {tabs.map((tab:any, tabIdx:any) => (
                                    <button
                                        key={tabIdx}
                                        type="button"
                                        className={classNames('block-zone__tabs-button', {
                                            'block-zone__tabs-button--active': tab === currentTab,
                                        })}
                                        onClick={() => onTabClick(tab)}
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </div>
                            <Arrow
                                className="block-zone__arrow block-zone__arrow--prev"
                                direction="prev"
                                onClick={handlePrevClick}
                            />
                            <Arrow
                                className="block-zone__arrow block-zone__arrow--next"
                                direction="next"
                                onClick={handleNextClick}
                            />
                        </div>
                        {!error ? (
                            <div className="block-zone__widget-body">
                                <div
                                    className={classNames('block-zone__carousel', {
                                        'block-zone__carousel--loading': isLoading,
                                    })}
                                >
                                    <div className="block-zone__carousel-loader" />

                                    <AppSlick className="block-zone__carousel-slick" ref={slickRef} {...slickSettings}>
                                        {products.map((product) => (
                                            <div key={product.id} className="block-zone__carousel-item">
                                                <ProductCard
                                                    product={product}
                                                    exclude={excludeElements}
                                                />
                                            </div>
                                        ))}
                                    </AppSlick>
                                </div>
                            </div>
                        ) : (
                            <div className="w-100 justify-content-center align-items-center d-flex flex-column">
                                <p>A Server Side Error occurred, please try again later</p>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-md"
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                >
                                    Reload
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(BlockZone);
