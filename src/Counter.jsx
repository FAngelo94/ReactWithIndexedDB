import React from "react";

import './App.css';
import { localDB } from "./cache";
import Image from "./image.png"

function Counter() {
    const [c, setC] = React.useState(0)
    const [store, setStore] = React.useState({})
    const [first, setFirst] = React.useState(false)

    React.useEffect(() => {
        if (!first) {
            localDB.get("c").then(val => {
                console.log("get Val", val)
                setC(val.value)
            }).catch(err => {
                console.log("get Errore", err)
            });
            setFirst(true);
        }
        if (c !== 0)
            localDB.set("c", {value:c}).then(val => {
                console.log("set Val", val)
            }).catch(err => {
                console.log("set Errore", err)
            });
    }, [c, first]);

    React.useEffect(() => {
        localDB.keys().then(val => {
            val.forEach(k => {
                localDB.get(k).then(val2 => {
                    console.log("get 2 Val", val2)
                    let s = {...store};
                    s[k] = val2;
                    console.log("Setstore", s, typeof(s))
                    setStore(s)
                }).catch(err2 => {
                    console.log("get 2 Errore", err2)
                });
            });
            console.log("keys Value", val)
        }).catch(err => {
            console.log("keys Errore", err)
        })
    }, [c]);



    return (
        <div className="App">
            <p>{c}</p>
            <button onClick={() => {
                setC(c + 1)
            }}>ADD</button>
            <p>Complete store: {JSON.stringify(store)}</p>
            <p>You can see the complete store in dev tools - application as you can see in this image</p>
            <img src={Image} style={{maxWidth: "800px"}}/>
        </div>
    );
}

export default Counter;
