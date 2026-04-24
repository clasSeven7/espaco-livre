import * as jwt_decode from 'jwt-decode';

interface TokenPayload {
  id: number;
  email?: string;
  tipo: 'cliente' | 'locatario';
  exp: number;
  iat: number;
}

export function getUserFromToken(): TokenPayload | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwt_decode.jwtDecode<TokenPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
}
