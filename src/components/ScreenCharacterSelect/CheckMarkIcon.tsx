export default function CheckMark(props: { color?: string; size: number | string }) {
  return (
    <svg style={{ width: props.size, height: props.size }} viewBox="0 0 17.837 17.837">
      <path
        d="M16.145 2.571a.7.7 0 00-.99 0L6.92 10.804l-4.241-4.27a.698.698 0 00-.989 0L.204 8.019a.703.703 0 000 .99l6.217 6.258a.704.704 0 00.99 0L17.63 5.047a.7.7 0 000-.994l-1.485-1.482z"
        fill={props.color ?? "#000000"}
      />
    </svg>
  );
}
