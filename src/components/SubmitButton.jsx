import { MdDoneOutline } from "react-icons/md";

const SubmitButton = ({pending,children}) => {
  return (
    <button 
      type="submit"
      className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 disabled:hover:scale-100 disabled:bg-slate-700 px-4 py-2 flex justify-center rounded-md gap-2 group items-center"
      disabled={pending}>
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-secondary mx-5 mt-[3px]"></div>
      ) : (
        <>
          {children + " "}
          <MdDoneOutline className="text-md transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
        </>
      )}
    </button>
  )
}

export default SubmitButton