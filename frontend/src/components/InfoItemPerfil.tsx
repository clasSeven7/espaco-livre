import { InfoItemPerfilProps } from '@/types/index';

export default function InfoItemPerfil({
  icon,
  label,
  value,
}: InfoItemPerfilProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="text-sm text-gray-800 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
