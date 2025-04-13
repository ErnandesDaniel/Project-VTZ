"use client";
import Script from "next/script";
const GoWebAssemblyProvider = ({ children }: any) => {

    return <>
        {children}
        <Script src="go_wasm_exec.js"

                onLoad={async ()=>{

                    console.log('loaded go_wasm_exec.js file');
                    const go = new globalThis.Go();
                    console.log(`go`, go);

                    const result = await WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject)
                    go.run(result.instance);
                    // const edges = [
                    //     ["1", "2" ],
                    //     ["1", "16"],
                    //
                    //     ["2", "3" ],
                    //     ["2", "4"],
                    //
                    //     ["3", "5" ],
                    //
                    //     ["4", "11" ],
                    //
                    //     ["5", "11" ],
                    //     ["5", "6"],
                    //
                    //     ["6", "7" ],
                    //
                    //     ["7", "8" ],
                    //     ["7", "10" ],
                    //     ["7", "11" ],
                    //
                    //     ["8", "9" ],
                    //
                    //     ["9", "10" ],
                    //     ["9", "14" ],
                    //     ["9",  "15" ],
                    //
                    //     ["10",  "11" ],
                    //     [ "10",  "14" ],
                    //
                    //     ["11", "12" ],
                    //
                    //     ["12",  "16" ],
                    //
                    //     ["13",  "16" ],
                    //     ["13",  "14" ],
                    //     ["13",  "15" ],
                    //
                    // ];
                    // const nodes= [
                    //     { id: "1", isShow: false },
                    //     { id: "2", isShow: true },
                    //     { id: "3", isShow: true },
                    //     { id: "4", isShow: true },
                    //     { id: "5", isShow: true },
                    //     { id: "6", isShow: true },
                    //     { id: "7", isShow: true },
                    //     { id: "8", isShow: false },
                    //     { id: "9", isShow: true },
                    //     { id: "10", isShow: true },
                    //     { id: "11", isShow: false },
                    //     { id: "12", isShow: true },
                    //     { id: "13", isShow: true },
                    //     { id: "14", isShow: true },
                    //     { id: "15", isShow: true },
                    //     { id: "16", isShow: true },
                    // ];
                    //const newEdges=JSON.parse(globalThis.filterAndRewireGraph(JSON.stringify(edges), JSON.stringify(nodes)));
                    //console.log(`globalThis.filterAndRewireGraph()`, newEdges);
                }}
        />
    </>
};

export default GoWebAssemblyProvider;