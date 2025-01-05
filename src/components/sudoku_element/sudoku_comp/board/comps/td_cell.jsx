export default function TdCell(props)
{
    return <div onClick={props.onClick} className="relative p-0 m-0 border-r-2 border-black cursor-pointer ">
                

                <div className={"w-full h-full p-1 pb-0 overflow-hidden z-20" 
                        + (Array.isArray(props.children) ? " text-[2vw] sm:text-[9.5pt] flex flex-wrap gap-0.5": " inline-flex text-xl sm:text-3xl justify-center items-center ")
                        + (props.start ? " text-blue-500 font-bold " : " ")
                        + (props.error ? " bg-red-200 " : " ")
                        + (!props.error && props.highlight ? " bg-slate-300 " : " ")
                        
                }>{Array.isArray(props.children) ? props.children.map((v, i)=> <div key={i}>{v}</div>) :
                   props.children == 0 ? "" : props.children}</div>

                    
            </div>
}