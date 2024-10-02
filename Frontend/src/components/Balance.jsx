export function Balance({balance}){
    return (
        <div className="p-4">
            <div className="font-bold text-xl flex justify-start">
                <p>Your Balance  </p><span className="ml-4">${balance ? balance : 0}</span>
            </div>
        </div>
    )
}