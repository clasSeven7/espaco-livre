import { NextRequest, NextResponse, type MiddlewareConfig } from 'next/server';

const publicRoutes = [
  { path: '/', whenAuthenticated: 'next' },
  { path: '/login', whenAuthenticated: 'redirect' },
  { path: '/cadastro/cliente', whenAuthenticated: 'redirect' },
  { path: '/cadastro/locatario', whenAuthenticated: 'redirect' },
  { path: '/recuperar_senha/cliente', whenAuthenticated: 'next' },
  { path: '/recuperar_senha/locatario', whenAuthenticated: 'next' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get('token');

  // 🔓 Rota pública, sem token → segue
  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  // 🔐 Rota privada, sem token → redireciona pro login
  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ Tem token e está acessando rota pública que deve redirecionar → vai pra home
  if (authToken && publicRoute?.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ Qualquer outro caso → segue normalmente
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|ico|gif)).*)',
  ],
};
