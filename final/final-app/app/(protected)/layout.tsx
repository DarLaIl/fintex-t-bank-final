import { jwtDecode, type JwtPayload } from 'jwt-decode';
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
                cookieStore.delete(token);
            }
            return <>{children}</>;
        } catch (err) {
            console.error('Invalid token:', err);
            redirect('/login');
        }
    } else {
        redirect('/login');
    }
};

export default ProtectedLayout;
