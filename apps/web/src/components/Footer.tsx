import {
  Facebook,
  Github,
  Instagram,
  MessageCircle,
  Twitter,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer
      className={`relative overflow-hidden text-white py-8 shadow-sm transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-tl from-[#212a30] to-[#161c20]'
          : 'bg-gradient-to-tl from-[#1178B9] to-[#0d4f7d]'
      }`}
    >
      <div
        className={`absolute inset-0 z-0 bg-center opacity-10 ${
          isDarkMode
            ? 'bg-[url("/textura_parede_escuro.png")]'
            : 'bg-[url("/textura_parede_claro.png")]'
        }`}
      />
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center gap-8 z-10">
          <div id="botoes_links" className="flex justify-center space-x-8 z-10">
            <Link href="/sobre" className="hover:underline">
              Sobre
            </Link>
            <Link href="/acessibilidade" className="hover:underline">
              Acessibilidade
            </Link>
            <Link href="/parceiros" className="hover:underline">
              Parceiros
            </Link>
            <Link href="/suporte" className="hover:underline">
              Suporte
            </Link>
          </div>
          <div
            id="redes_sociais"
            className="flex justify-center space-x-6 z-10"
          >
            <Link
              href="https://facebook.com"
              target="_blank"
              className="hover:text-gray-200"
            >
              <Facebook size={24} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-gray-200"
            >
              <Instagram size={24} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-gray-200"
            >
              <Twitter size={24} />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="hover:text-gray-200"
            >
              <Github size={24} />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              className="hover:text-gray-200"
            >
              <Youtube size={24} />
            </Link>
            <Link
              href="https://whatsapp.com"
              target="_blank"
              className="hover:text-gray-200"
            >
              <MessageCircle size={24} />
            </Link>
          </div>
          <div className="text-center">
            <p>© 2025 Espaço Livre. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
