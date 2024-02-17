"use client"
import React, { useState } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import LoginDialog from '../dialogs/login-dialog'
import RegisterDialog from '../dialogs/register-dialog'
import { Dialogs } from '../../lib/types'

const UnloggedAvatar = () => {
    const [showDialog, setShowDialog] = useState<Dialogs>("register")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    return (
        <>
            {showDialog === "login" ? (
                <LoginDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} setShowDialog={setShowDialog}>
                    <Avatar className="cursor-pointer w-16 h-16" role="button">
                        <AvatarFallback>J</AvatarFallback>
                    </Avatar>
                </LoginDialog>
            ) : (
                <RegisterDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} setShowDialog={setShowDialog}>
                    <Avatar className="cursor-pointer w-16 h-16" role="button">
                        <AvatarFallback>J</AvatarFallback>
                    </Avatar>
                </RegisterDialog>

            )}
        </>
    )
}

export default UnloggedAvatar