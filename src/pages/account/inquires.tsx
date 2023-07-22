// react
import React from 'react';
// third-party
import { FormattedMessage, useIntl } from 'react-intl';
// application
import AccountLayout from '~/components/account/AccountLayout';
import AppLink from '~/components/shared/AppLink';
import CurrencyFormat from '~/components/shared/CurrencyFormat';
import Navigation from '~/components/shared/Navigation';
import PageTitle from '~/components/shared/PageTitle';
import url from '~/api/services/url';
import { accountApi } from '~/api';
import { useList } from '~/api/services/hooks';

function Page() {
    const intl = useIntl();
    // const { list, options, onNavigate } =

    return (
        <div className="card">
            <PageTitle>{intl.formatMessage({ id: 'HEADER_INQUIRY_LIST' })}</PageTitle>

            <div className="card-header">
                <h5><FormattedMessage id="HEADER_INQUIRY_LIST" /></h5>
            </div>

            {/* {list && ( */}
            {/*    <React.Fragment> */}
            {/*        <div className="card-divider" /> */}

            {/*        <div className="card-table"> */}
            {/*            <div className="table-responsive-sm"> */}
            {/*                <table> */}
            {/*                    <thead> */}
            {/*                        <tr> */}
            {/*                            <th> */}
            {/*                                <FormattedMessage id="TABLE_NUMBER" /> */}
            {/*                            </th> */}
            {/*                            <th> */}
            {/*                                <FormattedMessage id="TABLE_DATE" /> */}
            {/*                            </th> */}
            {/*                            <th> */}
            {/*                                <FormattedMessage id="TABLE_STATUS" /> */}
            {/*                            </th> */}
            {/*                            <th> */}
            {/*                                <FormattedMessage id="TABLE_TOTAL" /> */}
            {/*                            </th> */}
            {/*                        </tr> */}
            {/*                    </thead> */}
            {/*                    <tbody> */}
            {/*                        {list.items.map((order) => ( */}
            {/*                            <tr key={order.id}> */}
            {/*                                <td> */}
            {/*                                    <AppLink href={url.accountOrderView(order)}> */}
            {/*                                        <FormattedMessage */}
            {/*                                            id="FORMAT_ORDER_NUMBER" */}
            {/*                                            values={{ number: order.number }} */}
            {/*                                        /> */}
            {/*                                    </AppLink> */}
            {/*                                </td> */}
            {/*                                <td> */}
            {/*                                    <FormattedMessage */}
            {/*                                        id="FORMAT_DATE_MEDIUM" */}
            {/*                                        values={{ date: Date.parse(order.createdAt) }} */}
            {/*                                    /> */}
            {/*                                </td> */}
            {/*                                <td> */}
            {/*                                    <FormattedMessage */}
            {/*                                        id={`TEXT_ORDER_STATUS_${order.status}`} */}
            {/*                                    /> */}
            {/*                                </td> */}
            {/*                                <td> */}
            {/*                                    <FormattedMessage */}
            {/*                                        id="TEXT_ORDER_TOTAL" */}
            {/*                                        values={{ */}
            {/*                                            total: <CurrencyFormat value={order.total} />, */}
            {/*                                            quantity: order.quantity, */}
            {/*                                        }} */}
            {/*                                    /> */}
            {/*                                </td> */}
            {/*                            </tr> */}
            {/*                        ))} */}
            {/*                    </tbody> */}
            {/*                </table> */}
            {/*            </div> */}
            {/*        </div> */}

            {/*        <div className="card-divider" /> */}
            {/*        <div className="card-footer"> */}
            {/*            <Navigation */}
            {/*                data={list.navigation} */}
            {/*                page={options.page} */}
            {/*                onNavigate={onNavigate} */}
            {/*            /> */}
            {/*        </div> */}
            {/*    </React.Fragment> */}
            {/* )} */}
        </div>
    );
}

Page.Layout = AccountLayout;

export default Page;