import Header from "../Header/Header";
import classes from './ErrorPage.module.css';

function ErrorPage() {
    return (
        <>
            <Header></Header>
            <main className={classes}>
                <h1>An error occurred!</h1>
                <p>Could not find this page!</p>
            </main>
        </>
    )
}

export default ErrorPage;