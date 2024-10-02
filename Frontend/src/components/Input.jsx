export function Input({title, placeholder, onChange}){
    return (
        <div className="ml-4 mr-4 p-2">
            <div className="font-medium">{title}</div>
            <div className="border-2 rounded-lg mt-1">
                <input type="text" placeholder={placeholder} className="p-1 outline-none" onChange={onChange}/>
            </div>
        </div>
    )
}