import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div>Entrar</div>
      <Link
        href="/login"
        className="flex items-center space-x-1 hover:text-blue-600"
      >
        <span>Login</span>
      </Link>
    </>
  );
}
