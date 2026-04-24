interface ProtocolLogoProps {
  name: string;
  size?: number;
}

export function ProtocolLogo({ name, size = 28 }: ProtocolLogoProps) {
  const s = size;
  const r = s / 2;

  switch (name) {
    case "Uniswap V3":
      // Pink circle, white unicorn-inspired "U" swoosh
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="14" fill="#FF007A" />
          <path
            d="M9 10.5C9 10.5 9.5 8 12 7.5C13.5 7.2 14.5 8 14.5 8C14.5 8 15.5 7.2 17 7.5C19.5 8 20 10.5 20 10.5V17C20 18.1 19.1 19 18 19H10C8.9 19 8 18.1 8 17V10.5H9Z"
            fill="white"
            opacity="0.15"
          />
          <path
            d="M10.5 17.5C10.5 17.5 10.5 13 11.5 11.5C12 10.8 13 10.5 14 10.5C15 10.5 16 10.8 16.5 11.5C17.5 13 17.5 17.5 17.5 17.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="11.5" cy="10" r="1.5" fill="white" />
          <circle cx="16.5" cy="10" r="1.5" fill="white" />
        </svg>
      );

    case "Aave V3":
      // Purple background, ghost shape
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="14" fill="#B6509E" />
          <path
            d="M14 7C11.2 7 9 9.2 9 12V20L11 18.5L13 20L14 19L15 20L17 18.5L19 20V12C19 9.2 16.8 7 14 7Z"
            fill="white"
            opacity="0.9"
          />
          <circle cx="11.5" cy="13" r="1.2" fill="#B6509E" />
          <circle cx="16.5" cy="13" r="1.2" fill="#B6509E" />
        </svg>
      );

    case "GMX":
      // Dark navy, teal accent "G"
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="14" fill="#1A1A2C" />
          <path
            d="M18 11.5C17 9.8 15.6 9 14 9C11.2 9 9 11.2 9 14C9 16.8 11.2 19 14 19C15.8 19 17.4 18 18.2 16.5H14.5V14.5H20V14C20 11.8 19.2 9.8 17.8 8.3"
            stroke="#03D1CF"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case "Lido":
      // Blue background, white stake/wave
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="14" fill="#00A3FF" />
          <path
            d="M14 7L17.5 12.5C17.5 12.5 19 14 19 15.5C19 17.9 16.8 19.5 14 19.5C11.2 19.5 9 17.9 9 15.5C9 14 10.5 12.5 10.5 12.5L14 7Z"
            fill="white"
            opacity="0.9"
          />
          <path
            d="M11.5 15C11.5 15 12.5 16 14 16C15.5 16 16.5 15 16.5 15"
            stroke="#00A3FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    default:
      // Generic fallback: colored circle with first letter
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="14" fill="#3F3F46" />
          <text
            x="14"
            y="18"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="white"
            fontFamily="system-ui"
          >
            {name[0]}
          </text>
        </svg>
      );
  }
}
