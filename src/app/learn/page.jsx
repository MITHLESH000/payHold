'use client'
import { ifError } from 'assert'
import React, { useState } from 'react'


export default function Learn() {

    const [count, setCount] = useState(10)
    const add = () => {
        if (count < 20) {
            setCount(count + 1)
        }
        else if (count >= 20) {
            setCount(`cannot add more then ${count}`)
        }

    }

    const subtract = () => {
        if (count > 0) {
            setCount(count - 1)
        }
        else if (count <= 0) {
            setCount(`Cannot subtract less then ${count}`)
        }
    }

    return (
        <>
            <div className=" h-screen flex flex-col items-center justify-center">
                <div>
                    <button onClick={add}
                        type="submit"
                        className="px-4 py-2 m-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                        ADD
                    </button>
                    <button onClick={subtract}
                        type="submit"
                        className="px-4 py-2 m-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                        SUB
                    </button>
                </div>
                <p className=" p-6 text-wwhite text-xl">
                    count: {count}
                </p>

            </div>

        </>
    )
}