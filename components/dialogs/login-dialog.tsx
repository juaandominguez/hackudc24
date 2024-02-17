"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl, FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"


import { Input } from "@/components/ui/input"
import { Dialogs } from "@/lib/types"
import GitHubIcon from "@/app/icons/github-icon"

import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email"
    }),
    password: z.string().min(7, 'Password must contain at least 7 letters'),
})


interface Props {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDialog: React.Dispatch<React.SetStateAction<Dialogs>>,
    children: React.ReactNode
}

const LoginDialog: React.FC<Props> = ({ isOpen, setIsOpen, setShowDialog, children }) => {
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onChange = () => {
        setIsOpen(!isOpen)
    }

    const onRegister = () => setShowDialog('register')

    const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            supabase.auth.signInWithPassword({
                email,
                password,
            }).then((res) => {
                setIsLoading(false)
                if (res.error) {
                    console.log(res.error)
                }
                else {
                    router.refresh()
                    setIsOpen(false)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const onSigninWithGithub = async () => {
        try {
            setIsLoading(true)
            supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                }
            }).then((res) => {
                setIsLoading(false)
                if (res.error) {
                    console.log(res.error)
                }
                else {
                    router.refresh()
                    setIsOpen(false)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center mb-2">Login</DialogTitle>
                    <DialogDescription className="text-center">
                        Login to save your data
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            disabled={isLoading}
                                            placeholder="Enter your email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isLoading}
                                            placeholder="Enter your password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-[100%]" type="submit" disabled={isLoading}>Login</Button>
                    </form>
                </Form>
                <DialogFooter>
                    <Button className="w-[100%]" disabled={isLoading} onClick={onSigninWithGithub}><GitHubIcon className="mr-2" /> Login with github</Button>
                </DialogFooter>
                <div className="border-t flex justify-between pt-3 px-5">
                    <p className="w-auto cursor-pointer text-muted-foreground text-sm">Forgot password?</p>
                    <p className="w-auto cursor-pointer text-sm" onClick={onRegister}>Register here</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog