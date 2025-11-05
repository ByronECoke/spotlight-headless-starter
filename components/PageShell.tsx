export default function PageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="space-y-6">{children}</div>
    </main>
  );
}