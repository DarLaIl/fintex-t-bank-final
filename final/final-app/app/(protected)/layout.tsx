import { jwtDecode, JwtPayload } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const token: string | undefined = cookieStore.get('jwt')?.value;

    if (token) {
        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            const isExpired =
                decodedToken.exp && decodedToken.exp * 1000 < Date.now();

            if (isExpired) {
                clearAuthToken();
                redirect('/login');
            }
            return <>{children}</>;
            
        } catch (err) {
            console.error('Invalid token:', err);
            clearAuthToken();
            redirect('/login');
        }

    } else {
        redirect('/login');
    }
};

function clearAuthToken() {
    document.cookie = 'auth_token=; Max-Age=0; path=/;';
}

export default ProtectedLayout;
