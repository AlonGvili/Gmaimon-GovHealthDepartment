export default function ValidationMessage({ message }: { message: string }) {
  return (
    <div className="my-4">
      <p className="text-red-500" role="alert">
        {message}
      </p>
    </div>
  );
}
