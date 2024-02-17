// SPDX-License-Identifier: LICENSE.md

import React from 'react'
import Navbar from './navbar'

const Header = () => {
    return (
        <>
            <Navbar />
            <h1 className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-red-600 bg-opacity-50 mt-24">
                Make your APIs <br /> stand out
            </h1>
        </>
    )
}

export default Header