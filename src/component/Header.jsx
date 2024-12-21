import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import darkMode from '../assets/dark-mode.svg';
import lightMode from '../assets/light-mode.svg';
import { toggleTheme, setInitialTheme } from '../feature/themeSlice.js';
import { logout } from '../firebase/firebase_auth.js';
import { logout as authLogout } from '../feature/authSlice.js';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.userData);
    const theme = useSelector((state) => state.theme.theme); 

    useEffect(() => {
        if (currentUser) {
            dispatch(setInitialTheme({ currentUser })); 
        }
    }, [dispatch, currentUser]);

    const handleLogout = async () => {
        await logout();
        dispatch(authLogout());
        navigate('/');
    };

    const handleToggleTheme = () => {
        dispatch(toggleTheme({ currentUser })); 
    };

    if (!currentUser) return null; 
    return (
        <header className={`flex justify-between ${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white'} top-0 fixed z-10 my-0 mx-auto w-full sm:w-3/4`}>
            <div className="mx-8 h-16 flex items-center">
                <h2 className="text-xl font-medium">
                    Welcome <span className="text-purple-600">{currentUser.name}</span>
                </h2>
            </div>
            <div className="flex items-center mr-8">
                <button
                    onClick={handleToggleTheme}
                    className={`p-2 rounded-full h-8 w-8 mx-4 ${theme === 'light' ? 'border border-black' : 'bg-yellow-500 text-black'}`}
                >
                    {theme === 'light' ? <img src={darkMode} alt="Dark" /> : <img src={lightMode} alt="Light" />}
                </button>
                <button onClick={handleLogout} className="hover:border border-black">
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
