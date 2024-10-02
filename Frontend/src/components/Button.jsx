export function Button({title, onClick}){
    return (
        <div className="ml-4 mr-4">
            <div className="bg-black rounded-lg mt-2 p-2 text-white flex justify-center items-center cursor-pointer" onClick={onClick}>
                <p>{title}</p>
            </div>
        </div>
    )
}