// react
import React from 'react';
// application
import BlockHeader from '~/components/blocks/BlockHeader';
import BlockMap from '~/components/blocks/BlockMap';
import BlockSpace from '~/components/blocks/BlockSpace';
import PageTitle from '~/components/shared/PageTitle';
// data
import theme from '~/data/theme';

function Page() {
    return (
        <React.Fragment>
            <PageTitle>Contact Us</PageTitle>

            <BlockMap />

            <BlockHeader
                pageTitle="Contact Us"
                breadcrumb={[
                    { title: 'Home', url: '' },
                    { title: 'Breadcrumb', url: '' },
                    { title: 'Current Index', url: '' },
                ]}
                afterHeader={false}
            />

            <div className="block">
                <div className="container container--max--lg">
                    <div className="card">
                        <div className="card-body card-body--padding--2">
                            <div className="row">
                                <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                                    <div className="mr-1">
                                        <h4 className="contact-us__header card-title">Our Address</h4>

                                        <div className="contact-us__address">
                                            <p>
                                                2780-289 Matsuzaki, Takuma-cho, Mitoyo, Kagawa 769-1102 JAPAN
                                                <br />
                                                {`Email: ${theme.contacts.email[0]}`}
                                                <br />
                                                Phone Number: +81 80 7085-8003
                                                <br />
                                                whatsApp: +81 8070858003
                                            </p>
                                            <p>
                                                <strong>Opening Hours</strong>
                                                <br />
                                                Monday to Friday: 8am-8pm
                                                <br />
                                                Saturday: 10am-6pm
                                                <br />
                                                Sunday: 10am-4pm
                                            </p>

                                            <p>

                                                <strong>NOTICE</strong>
                                                <br />
                                                Check our FAQ section to find answer for common questions.
                                                OR you can reach us by any of the above methods.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-6">
                                    <div className="ml-1">
                                        <h4 className="contact-us__header card-title">Leave us a Message</h4>

                                        <form>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="form-name">Your Name</label>
                                                    <input
                                                        type="text"
                                                        id="form-name"
                                                        className="form-control"
                                                        placeholder="Your Name"
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="form-email">Email</label>
                                                    <input
                                                        type="email"
                                                        id="form-email"
                                                        className="form-control"
                                                        placeholder="Email Address"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="form-subject">Subject</label>
                                                <input
                                                    type="text"
                                                    id="form-subject"
                                                    className="form-control"
                                                    placeholder="Subject"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="form-message">Message</label>
                                                <textarea
                                                    id="form-message"
                                                    className="form-control"
                                                    rows={4}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Send Message</button>
                                        </form>
                                    </div>
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
