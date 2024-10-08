import { useNavigate } from 'react-router-dom';

const Header = ()=>{

    let navigate = useNavigate();

    const home = ()=>{
        navigate('/', {replace:true})
    }
    return (
        <header className="header bg-primary ">
            
            <h1 className='d-flex items-center '>
                <button type="button" className='btn btn-secondary w-100' onClick={home}>Home</button>
            </h1>
        </header>
    )
}

export default Header