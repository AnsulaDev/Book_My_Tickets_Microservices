import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header'

const AppComponent= ({Component, pageProps, currentUser}) => {
    return (
        <div>
        <Header currrentUser={currentUser}/>

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