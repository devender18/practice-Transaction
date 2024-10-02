export function Heading({heading, subheading}){
    return(
        <div className="mt-4">
            <div className="flex justify-center items-center ">
                <h1 className="text-3xl font-bold">{heading}</h1>
            </div>
            <div className="text-center mt-2 text-gray-600">{subheading}</div>
        </div>
    )
}