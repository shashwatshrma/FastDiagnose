export default function Button({ text, fun }) {
  return (
    <button
      className="action:scale-100 m-4 h-auto w-fit rounded-xl border-2 border-teal-400 bg-gray-800 pb-2 pl-4 pr-4 pt-2 transition hover:scale-105 hover:text-teal-400"
      onClick={() => fun()}
    >
      {text}
    </button>
  );
}
