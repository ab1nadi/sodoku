import { useEffect, useState } from "react"
export default function TdCell(props)
{
    let [value, setValue] = useState("");
    let [itsAList, setItsAList] = useState(false);
    useEffect(()=>
    {
        // its a note list
        if(Array.isArray(props.children))
        {
            let newValue = "";

            props.children.forEach((v)=>
            {
                newValue += v + " ";
            })
            newValue = newValue.slice(0,-1);
            setValue(newValue);
            setItsAList(true);
        }
        // not a note list
        else if(props.children != 0)
        {
            setValue(props.children);
            setItsAList(false);
        }
        // its zero so clear it
        else 
        {
            setValue("");
            setItsAList(false);

        }
    })

    return <div onClick={props.onClick} className="relative p-0 m-0 border-r-2 border-black cursor-pointer ">
                

                <div className={"w-full h-full p-1 pb-0 resize-none z-20" 
                        + (itsAList ? " text-[0.6rem] sm:text-[0.65rem]  intline-flex flex-wrap items-center justify-center gap-1": " inline-flex text-xl sm:text-2xl md:text-3xl  justify-center items-center ")
                        + (props.start ? " text-blue-500 font-bold " : " ")
                        + (props.error ? " bg-red-200 " : " ")
                        + (props.highlight? " bg-slate-300 " : " ")
                        
                }>{value}</div>

                    
            </div>
}