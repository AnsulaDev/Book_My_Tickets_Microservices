import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

const AppComponent= ({Component, pageProps, currentUser}) => {
    return (
        <div>
        <h1>Header {currentUser.email}</h1>

            <Component {...pageProps} />
        </div>
    );
};

AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx); //ctx intended to go individual page but appContext intended to go in app Component
    const { data } = await client.get('/api/users/currentuser');

    // handling multiple getInitial props 

    let pageProps ={};
    if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {
        pageProps,
        ...data
    };

};

export default AppComponent;