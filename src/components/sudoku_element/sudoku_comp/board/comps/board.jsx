import TdCell from "./td_cell";
export default function Board(props)
{
    return(
   
            <div  onKeyDown={props.onKeyDown} tabIndex="1" onBlur={props.onBlur} ref={props.innerRef}  className=" w-full aspect-square bg-white">
                <div className=" w-full h-full grid grid-rows-[11.11%_11.11%_11.11%_11.11%_11.11%_11.11%_11.11%_11.11%_11.11%]  focus:outline-0 border-2 border-black [&>*:nth-child(3)]:border-b-4 [&>*:nth-child(6)]:border-b-4 ">
                    
                    {/* displays the rows */}
                    {props.matrix.map((row, y) => {
                        return (
                            <div key={y} className={" grid w-full h-full grid-cols-[11.11%_11.11%_11.11%_11.11%_11.11%_11.11%_11.11%_11.11%_11.11%] border-b-2  border-black [&>*:nth-child(3)]:border-r-4 [&>*:nth-child(6)]:border-r-4 [&>*:nth-child(9)]:border-r-0"}>
                                
                                {/* displays the columns */}
                                {row.map((col, x) =>
                                {
                                    var key = {x: x, y:y}
                                    
                                    // highlight this one
                                    var highlight = props.highlighted && key.x == props.highlighted.x && key.y == props.highlighted.y;

                                    // this one wont be editable if it is puzzlestart
                                    var solutionStart = props.puzzleStart[y][x] !=0;

                                    return <TdCell error={props.errors[y][x]} onClick={() => props.setCellHighlight(key)} key={(y*9+x).toString()} highlight={highlight} start={solutionStart}>{props.matrix[y][x]}</TdCell>
                                })}
                            </div>
                        ); 
                    })}
                </div>
            </div>
   

    )
}