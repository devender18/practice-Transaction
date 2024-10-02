export function Header(){
    return (
        <div className="flex justify-between items-center border-b-2 p-4">
            <div>
                <h1 className="text-2xl font-bold">Payments App</h1>
            </div>

            <div className="flex justify-center items-center">
                <div className="mr-4">
                    <span className="font-semibold">Hello, User</span>
                </div>

                <div className="flex items-center justify-center">
                    <div className="bg-gray-400 rounded-full h-8 w-8 flex justify-center items-center">
                        <span>U</span>
                    </div>
                </div>
            </div>

        </div>
    )
}