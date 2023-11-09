import Link from 'next/link';
export default ({ currrentUser}) =>{
    const links = [
        !currrentUser && {label: 'Sign Up', href:'/auth/signup'},
        !currrentUser && {label: 'Sign In', href:'/auth/signin'},
        currrentUser && {label: 'Sign Out', href:'/auth/signout'},
    ]
        .filter(linkConfig => linkConfig) // that's gonna filter out any entries in there that are false.
        .map(({label, href})=>{
            return <li key={href} className='nav-item'>
                <Link href={href} className='nav-link'>
                    {label}
                </Link>
                
            </li>
        });
    return <nav className='navbar navbar-light bg-light'>
        <Link className='navbar-brand' href='/'>
            Book My Tickets
        </Link>
        <div className='d-flex justify-content-end'>
            <ul className='nav d-flex align-items-center'>
                {links}
            </ul>
        </div>
    </nav>
};