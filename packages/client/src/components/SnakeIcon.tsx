export const SnakeIcon = ({ color }: { color: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="none">
      <circle cx="21" cy="21" r="21" fill={color} />
      <circle cx="21" cy="21" r="21" fill="rgba(0,0,0,.4)" />
      <circle cx="19.5" cy="19.5" r="19.5" fill={color} />
      <circle cx="10" cy="13" r="7.5" fill="#fff" stroke="#000" />
      <circle cx="10.5" cy="13.5" r="5.5" fill="#000" />
      <ellipse cx="13" cy="9.5" fill="#fff" rx="1" ry="1.5" />
      <circle cx="27" cy="13" r="7.5" fill="#fff" stroke="#000" />
      <circle cx="27.5" cy="13.5" r="5.5" fill="#000" />
      <ellipse cx="30" cy="9.5" fill="#fff" rx="1" ry="1.5" />
    </svg>
  );
};
