import axios from '../api/api';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/users/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken, username: response.data.username }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;