import Buffer from "@/components/Buffer"
const loading = () => {
  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center">
      <Buffer />
      <p className="text-lg relative top-8 left-3">Loading...</p>
    </main>
  )
}

export default loading