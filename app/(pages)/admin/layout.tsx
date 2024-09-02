import { AdminAuthProvider } from './context/AdminSessionContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminAuthProvider>
            {children}
        </AdminAuthProvider>
    );
}
