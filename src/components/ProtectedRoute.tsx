import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export const ProtectedRoute = ({ children, roles }: { children: React.ReactNode, roles: string[] }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !roles.includes(user.role))) {
      router.push('/login');
    }
  }, [user, loading, roles]);

  if (loading) return <LoadingSpinner />;
  if (!user || !roles.includes(user.role)) return null;

  return <>{children}</>;
}; 